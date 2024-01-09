import React from 'react'

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ size = 32, ...props }, ref) => {
  return <svg width={size} height={size} ref={ref} {...props} />
})

Icon.displayName = 'Icon'

function Play({ ...props }: IconProps) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 256 256">
      <path d="M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z"></path>
    </Icon>
  )
}

function Pause({ ...props }: IconProps) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 256 256">
      <path d="M200,36H160a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,200,36Zm4,172a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM96,36H56A12,12,0,0,0,44,48V208a12,12,0,0,0,12,12H96a12,12,0,0,0,12-12V48A12,12,0,0,0,96,36Zm4,172a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H96a4,4,0,0,1,4,4Z"></path>
    </Icon>
  )
}

function ResetTimer({ ...props }: IconProps) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 256 256">
      <path d="M236,56v48a4,4,0,0,1-4,4H184a4,4,0,0,1,0-8h37.7L187.53,68.69l-.13-.12a84,84,0,1,0-1.75,120.51,4,4,0,0,1,5.5,5.82A91.43,91.43,0,0,1,128,220h-1.26A92,92,0,1,1,193,62.84l35,32.05V56a4,4,0,1,1,8,0Z"></path>
    </Icon>
  )
}

function Stop({ ...props }: IconProps) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 256 256">
      <path d="M200.73,44H55.27A11.29,11.29,0,0,0,44,55.27V200.73A11.29,11.29,0,0,0,55.27,212H200.73A11.29,11.29,0,0,0,212,200.73V55.27A11.29,11.29,0,0,0,200.73,44ZM204,200.73a3.28,3.28,0,0,1-3.27,3.27H55.27A3.28,3.28,0,0,1,52,200.73V55.27A3.28,3.28,0,0,1,55.27,52H200.73A3.28,3.28,0,0,1,204,55.27Z"></path>
    </Icon>
  )
}

export { Play, Pause, ResetTimer, Stop }
