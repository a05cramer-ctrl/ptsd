interface PTSDLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  className?: string
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
  hero: 'text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem]',
}

export function PTSDLogo({ size = 'lg', className = '' }: PTSDLogoProps) {
  return (
    <div className={`ptsd-logo ${sizeClasses[size]} ${className}`}>
      <span className="p">P</span>
      <span className="t">T</span>
      <span className="s">S</span>
      <span className="d">D</span>
    </div>
  )
}
