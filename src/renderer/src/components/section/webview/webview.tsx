import { FC } from "react";
import { useUserdata } from "store/userdata";

type Props = {
  id?: string
}

export const Webview: FC<Props> = ({
  id,
}) => {

  const { get_webview } = useUserdata.getState()

  const config = get_webview(id)

  const src = `https://${config?.src}`

  if (config) {
    return (
      <webview
        key={config.id}
        src={src}
        partition={`persist:${config.id}`}
      />
    )
  }

  return (
    <div className="m-3">
      TODO: ERROR PAGE
    </div>
  )

  // const _src = `https://${src}`
}
