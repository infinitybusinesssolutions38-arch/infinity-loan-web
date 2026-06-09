const fs = require("fs");
const path = require("path");

const content = `import {
  COMPANY_OFFICE_ADDRESS_LINES,
  COMPANY_OFFICE_TITLE,
} from "@/app/api/lib/company-contact";

type Props = {
  heading?: string;
  titleClassName?: string;
  bodyClassName?: string;
};

export default function CompanyOfficeAddress({
  heading = "Office Location:",
  titleClassName = "font-semibold text-[#1A1A1A] text-sm mb-1",
  bodyClassName = "text-[#666666] text-sm leading-relaxed",
}: Props) {
  return (
    <div>
      {heading ? (
        <p className="font-semibold text-[#1A1A1A] mb-1">{heading}</p>
      ) : null}
      <p className={titleClassName}>{COMPANY_OFFICE_TITLE}</p>
      <p className={bodyClassName}>
        {COMPANY_OFFICE_ADDRESS_LINES.map((line, index) => (
          <span key={line}>
            {line}
            {index < COMPANY_OFFICE_ADDRESS_LINES.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    </div>
  );
}
`;

const target = path.join(__dirname, "..", "src", "components", "CompanyOfficeAddress.tsx");
fs.writeFileSync(target, content, "utf8");
console.log("Wrote", target);