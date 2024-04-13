export const Countdown = ({
  minDigits = 2,
  count,
}: {
  minDigits?: number;
  count: number;
}) => {
  const formatter = new Intl.NumberFormat("en-en", {
    minimumIntegerDigits: minDigits,
    useGrouping: false,
  });

  const digits = formatter.format(count);

  return (
    <span className="inline-flex flex-row-reverse font-title text-5xl leading-[1em]">
      {digits
        .split("")
        .reverse()
        .map((e) => (
          // @ts-expect-error This is always fine but it causes a type error
          <span className="counterDigit" style={{ "--value": e }} />
        ))}
    </span>
  );
};
