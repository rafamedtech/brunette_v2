export function useFormatters() {
  const dateFormatter = (
    type: "short" | "long",
    date: Date | string | undefined,
  ) => {
    const dateOptions: Intl.DateTimeFormatOptions =
      type === "short"
        ? {
            month: "long",
            day: "numeric",
          }
        : {
            year: "numeric",
            month: "long",
            day: "numeric",
          };

    // const dateOptions: Intl.DateTimeFormatOptions = {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // };
    if (date === undefined) return;
    return new Date(date).toLocaleString("es-MX", dateOptions);
  };
  return { dateFormatter };
}
