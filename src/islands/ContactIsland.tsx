import { motion } from 'framer-motion';
import { useToast } from '@/hooks/useToast';
import { EMAIL_ADDRESS, EMAIL_TOAST_MESSAGE } from '@/lib/constants';

type LinkItem = {
  href: string;
  icon?: string; // font-awesome class (optional)
  svg?: JSX.Element; // inline SVG for brands not in Font Awesome
  label: string;
};

// 自定义品牌图标（简化版）：抖音 & 哔哩哔哩
const DouyinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M14 3v5.5c0 2.8 2.3 5 5 5v3.1c-3 0-5.6-1.4-7.2-3.5v4.9c0 2.9-2.3 5.2-5.2 5.2s-5.2-2.3-5.2-5.2c0-2.9 2.3-5.3 5.2-5.3.4 0 .8.1 1.2.2v3.2c-.4-.2-.8-.3-1.2-.3-1.1 0-2.1 1-2.1 2.2s1 2.1 2.1 2.1 2.1-1 2.1-2.1V3H14z" />
  </svg>
);

const BilibiliIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 5l2 2M17 5l-2 2" />
    <rect x={3} y={7} width={18} height={12} rx={3} />
    <circle cx={9} cy={13} r={1.5} fill="currentColor" stroke="none" />
    <circle cx={15} cy={13} r={1.5} fill="currentColor" stroke="none" />
  </svg>
);

const links: LinkItem[] = [
  { href: 'https://github.com/zslxy1', icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: 'https://qm.qq.com/q/nzuKiLnPrM', icon: 'fa-brands fa-qq', label: 'QQ' },
  { href: 'https://v.douyin.com/O_E2Cq-9-3c/', svg: <DouyinIcon />, label: '抖音' },
  { href: `mailto:${EMAIL_ADDRESS}`, icon: 'fa-solid fa-envelope', label: 'Email' },
  { href: 'https://b23.tv/6muFVnQ', svg: <BilibiliIcon />, label: 'Bilibili' },
];

export default function ContactIsland() {
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: LinkItem) => {
    if (link.label === 'Email') {
      e.preventDefault();
      toast(EMAIL_TOAST_MESSAGE, {
        duration: 8000,
        position: 'top-center',
      });
    }
  };
  return (
    <section className="relative py-10 transition-colors duration-300">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-blue-500/10 dark:to-purple-500/10" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              onClick={(e) => handleClick(e, link)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 shadow-sm hover:shadow-md transition-all"
            >
              {link.svg ? (
                <span className="inline-flex items-center justify-center w-5 h-5 text-current">{link.svg}</span>
              ) : (
                <i className={link.icon!}></i>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
