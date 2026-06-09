export const COMPANY_OFFICE_TITLE = "Corporate & Registered Office";

export const COMPANY_OFFICE_ADDRESS_LINES = [
  "8th Floor, Magnum Tower – 1,",
  "Golf Course Extension Road, Sector 58,",
  "Gurugram, Haryana – 122098, India",
];

export const COMPANY_OFFICE_ADDRESS_HTML = COMPANY_OFFICE_ADDRESS_LINES.join("<br>");

export const COMPANY_OFFICE_ADDRESS_TEXT = COMPANY_OFFICE_ADDRESS_LINES.join("\n");

export const COMPANY_OFFICE_EMAIL_SECTION_HTML = `
      <div class="section">
        <div class="section-title">Our Office Location</div>
        <div class="office-box">
          <h4>${COMPANY_OFFICE_TITLE}</h4>
          <p>${COMPANY_OFFICE_ADDRESS_HTML}</p>
        </div>
      </div>`.trim();
