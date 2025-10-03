


export const input_classname = (strings: TemplateStringsArray) => {

  return (props: any) => utils.classname(
    strings[0],
    props.className, {
    [`${props.variant}-button`]: !!props.variant,
    [`color-${props.color}`]: !!props.color,
    [`size-${props.size}`]: true,
  })
}