type SectionTitleProps = {
  title: string;
  beforeTitle?: string;
};
export default function SectionTitle({title, beforeTitle}: SectionTitleProps) {
  return (
    <>
      <h3 className="text-start text-xl sm:text-2xl font-medium">
        {beforeTitle}
      </h3>
      <h2 className="text-start mb-5 text-2xl sm:text-3xl font-semibold leading-normal">
        {title}
      </h2>
    </>
  );
}
