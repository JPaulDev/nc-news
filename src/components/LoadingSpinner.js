export default function LoadingSpinner({
  size = 20,
  color = 'currentColor',
  ...rest
}) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg
        className="animate-[spin_1s_steps(12)_infinite]"
        aria-label="Loading..."
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <rect
          height="6"
          opacity="0"
          rx="3"
          ry="3"
          transform="rotate(-90 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.08333333333333333"
          rx="3"
          ry="3"
          transform="rotate(-60 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.16666666666666666"
          rx="3"
          ry="3"
          transform="rotate(-30 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.25"
          rx="3"
          ry="3"
          transform="rotate(0 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.3333333333333333"
          rx="3"
          ry="3"
          transform="rotate(30 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.4166666666666667"
          rx="3"
          ry="3"
          transform="rotate(60 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.5"
          rx="3"
          ry="3"
          transform="rotate(90 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.5833333333333334"
          rx="3"
          ry="3"
          transform="rotate(120 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.6666666666666666"
          rx="3"
          ry="3"
          transform="rotate(150 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.75"
          rx="3"
          ry="3"
          transform="rotate(180 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.8333333333333334"
          rx="3"
          ry="3"
          transform="rotate(210 50 50)"
          width="25"
          x="72"
          y="47"
        />
        <rect
          height="6"
          opacity="0.9166666666666666"
          rx="3"
          ry="3"
          transform="rotate(240 50 50)"
          width="25"
          x="72"
          y="47"
        />
      </svg>
    </div>
  );
}
