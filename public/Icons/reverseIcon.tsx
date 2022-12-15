export default function ReverseIcon(
  style: string = "",
  height: string = "24",
  width: string = "24"
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={style}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z" />
    </svg>
  );
}
