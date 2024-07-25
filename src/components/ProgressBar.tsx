interface IProps {
  value: number;
}

export const ProgressBar = ({ value }: IProps) => {
  const getColor = (value: number) => {
    const red = Math.min(255, Math.floor((255 * value) / 100));
    const green = Math.min(255, Math.floor((255 * (100 - value)) / 100));
    return `rgb(${red},${green},0)`;
  };

  const containerStyle = {
    width: "30%",
    borderRadius: "13px",
    overflow: "hidden",
  };

  const fillStyle = {
    height: "20px",
    width: `${value}%`,
    backgroundColor: getColor(value),

    borderRadius: "13px 0 0 13px",
  };

  return (
    <div style={containerStyle}>
      <div style={fillStyle}></div>
    </div>
  );
};
