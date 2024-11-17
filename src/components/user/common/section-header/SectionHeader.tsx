import "./SectionHeader.scss";

interface Props {
  title: string;
}
const SectionHeader = ({ title }: Props) => {
  return (
    <div className="section-title">
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader;
