export const Countdown = ({
  minDigits,
  count,
}: {
  minDigits?: number;
  count: number;
}) => {
  const formatter = new Intl.NumberFormat("en-en", {
    minimumIntegerDigits: minDigits ?? 2,
    useGrouping: false,
  });

  const digits = formatter.format(count);

  return (
    <span className="inline-flex flex-row-reverse font-title text-5xl leading-[1em]">
      {[...digits].reverse().map((e) => (
        // @ts-expect-error This is always fine but it causes a type error
        <span className="counterDigit" style={{ "--value": e }} />
      ))}
    </span>
  );
};
