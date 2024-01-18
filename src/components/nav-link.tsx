import { Link, LinkProps, useLocation } from 'react-router-dom'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()
  return (
    <Link
      data-active={pathname === props.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
      {...props}
    />
  )
}

/*
ANOTAÇÕES -----------------------------------------------------
data-[]: para dar um atributo dinâmico
*/
