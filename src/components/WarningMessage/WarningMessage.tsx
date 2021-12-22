import { useEffect, useState } from "react";
import Warning from "../../types/warning";
import "./WarningMessage.scss";

export default function WarningMessage(props: Warning) {
  const [active, setActive] = useState(false);
  const styleWarning = {
    backgroundColor:
      props.type === "error"
        ? "#700B79"
        : props.type === "success"
        ? "#00A8E8"
        : "#E5FCF5",
  };
  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1000);
  }, []);
  return (
    <div style={styleWarning} className={`Warning ${active ? "active" : ""} `}>
      {props.title}
    </div>
  );
}
