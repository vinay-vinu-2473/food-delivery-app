import Link from 'next/link'

export default function CustomLink({ href, children, ...props }) {
  return (
    <Link href={href} legacyBehavior {...props}>
      {children}
    </Link>
  )
}