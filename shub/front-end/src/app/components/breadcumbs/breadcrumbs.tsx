"use client"
// Breadcrumbs.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const router = useRouter();

  return (
    <div className="breadcrumbs">
      <Link href="/">
        <a>Home</a>
      </Link>

      {items.map((item, index) => (
        <span key={index}>
          <span className="chevron">/</span>
          <Link href={item.url} >
            <a>{item.name}</a>
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
