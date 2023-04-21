export default function Error({ error }) {
  const { msg, status } = error;

  return (
    <section className="xs:flex-row flex h-full flex-col items-center justify-center gap-7">
      <div className="text-6xl font-bold text-sky-700">{status}</div>
      <div className="xs:block hidden h-48 w-[0.125rem] bg-sky-700" />
      <h2 className="text-center">{msg}</h2>
    </section>
  );
}
