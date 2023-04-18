import clsx from 'clsx';

export default function Divider({ className }) {
  return (
    <div className={clsx('space-y-1', className)}>
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="h-px bg-stone-300" />
      ))}
    </div>
  );
}
