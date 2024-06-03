import { FC } from "react";

interface WhatsAppWidgetProps {
  width: number;
  height: number;
}

const WhatsappWidget: FC<WhatsAppWidgetProps> = ({ width, height }) => {
  return (
    <iframe
      id="WhatsAppConnect"
      loading="lazy"
      title="WhatsAppConnect"
      width={width}
      height={height}
      style={{ borderRadius: 5 }}
      src="https://cdn.smooch.io/message-us/index.html?channel=whatsapp&color=green&size=standard&radius=0px&label=Message us on WhatsApp&number=61414145966"
    />
  );
};

export default WhatsappWidget;
