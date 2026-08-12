 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }const sanitizeTextContent = (text, defaultFallback = "") => {
  if (!text || typeof text !== "string") return defaultFallback;
  let clean = text.replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ");

  const hasGarbage = clean.includes("\uFFFD") || clean.includes("FlateDecode") || clean.includes("endstream") || clean.includes("endobj");

  if (!hasGarbage) {
    const trimmed = clean.replace(/\s+/g, " ").trim();
    return trimmed.length > 0 ? trimmed : defaultFallback;
  }

  const lines = clean.split(/\r?\n/);
  const cleanLines = lines.filter(line => {
    const l = line.trim();
    if (!l || l.length < 2) return false;
    if (l.includes("\uFFFD") || l.includes("FlateDecode") || l.includes("endstream")) return false;
    return true;
  });

  const result = cleanLines.join(" ").replace(/\s+/g, " ").trim();
  return result.length > 0 ? result : defaultFallback;
};

const normalizePdfDisplayText = (value, fallback = "") => {
  if (value === null || value === undefined) return fallback;
  const str = String(value).trim();
  if (!str) return fallback;

  return str
    .replace(/[\u00A0]/g, " ")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s*—\s*/g, " — ")
    .replace(/\s*-\s*/g, " - ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])(\()/g, "$1 (")
    .replace(/(\))([A-Za-z])/g, ") $1")
    .replace(/\s{2,}/g, " ")
    .trim() || fallback;
};

const getHeaderLogoHtml = (
  logoUrl,
  companyName,
  primaryColor,
  size = 44,
  maxWidth = 140,
  radius = 12
) => {
  const crossOriginAttr = '';

  const frameWidth = size * 1.2;
  const frameHeight = size * 1.2;
  const paddingVal = size * 0.15;

  const customLogoImg = logoUrl ? `<img src="${logoUrl}" alt="${companyName} logo" ${crossOriginAttr} decoding="sync" style="display: block; width: 100%; height: 100%; max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.style.display='none'; var fb = this.nextElementSibling; if (fb) fb.style.display='inline-flex';" />` : "";

  return `
    <div class="pdf-logo-frame" style="background: #ffffff !important; width: ${frameWidth}px; height: ${frameHeight}px; min-width: ${frameWidth}px; padding: ${paddingVal}px; border-radius: ${radius}px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.18); border: 1px solid #e2e8f0; flex-shrink: 0; overflow: hidden; box-sizing: border-box;">
      ${customLogoImg}
      <div style="width: 100%; height: 100%; display: ${logoUrl ? 'none' : 'inline-flex'}; align-items: center; justify-content: center;">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; display: block;" xmlns="http://www.w3.org/2000/svg">
          <!-- Green Mobile Phone Outer Frame -->
          <rect x="22" y="16" width="56" height="74" rx="8" ry="8" fill="none" stroke="#16a34a" stroke-width="5.5" />
          <line x1="42" y1="22" x2="58" y2="22" stroke="#16a34a" stroke-width="4.5" stroke-linecap="round" />
          <circle cx="50" cy="82" r="3" fill="#16a34a" />
          
          <!-- Dark Navy House Roof Chevron -->
          <path d="M 12 46 L 50 18 L 88 46" fill="none" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
          
          <!-- Center Power / Circle Logo Icon -->
          <circle cx="50" cy="54" r="14" fill="none" stroke="#0f172a" stroke-width="4.5" />
          <line x1="50" y1="44" x2="50" y2="54" stroke="#0f172a" stroke-width="4.5" stroke-linecap="round" />
          <path d="M 43 49 A 9 9 0 1 0 57 49" fill="none" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  `;
};

const numberToWords = (num) => {
  if (isNaN(num) || num <= 0) return 'Indian Rupees Zero Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numStr = Math.round(num).toString();
  if (numStr.length > 9) return `₹${num.toLocaleString('en-IN')} Only`;
  const n = ('000000000' + numStr).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return `₹${num.toLocaleString('en-IN')} Only`;
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || (b[n[1][0]] + ' ' + a[n[1][1]])) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || (b[n[2][0]] + ' ' + a[n[2][1]])) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || (b[n[3][0]] + ' ' + a[n[3][1]])) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || (b[n[4][0]] + ' ' + a[n[4][1]])) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || (b[n[5][0]] + ' ' + a[n[5][1]])) : '';
  return `Indian Rupees ${str.trim()} Only`;
};

let isFetchingRemoteBranding = false;
export const getGlobalCompanyDetails = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("crm_global_company_details") || localStorage.getItem("global_crm_company_profile");
      const logoStored = localStorage.getItem("global_crm_company_logo") || localStorage.getItem("speshway_crm_company_logo");
      let details = null;
      if (stored) {
        details = JSON.parse(stored);
      } else {
        details = {
          companyName: "Speshway Solutions Private Limited",
          billedByCompany: "Speshway Solutions Private Limited",
          companyTagline: "Website & App Development Company - Hyderabad, India",
          billedBySub: "Software Development Company",
          companyEmail: "info@speshway.com",
          companyPhone: "+91 91000 06020",
          companyWebsite: "www.speshway.com",
          companyGstin: "36AAAAA0000A1Z5",
          companyAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
          billedByAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
          billedByContact: "info@speshway.com | +91 91000 06020 | www.speshway.com",
          pdfPrimaryColor: "#8b1e1e",
          pdfSecondaryColor: "#991b1b",
          companyLogoUrl: "/pdf-logo.png",
          showWatermark: true,
          companyWatermarkText: "SPESHWAY SOLUTIONS"
        };
      }
      if (!details.companyLogoUrl || details.companyLogoUrl === "/logo.png" || details.companyLogoUrl === "/logo.jpg") {
        details.companyLogoUrl = "/pdf-logo.png";
      }

      if (!isFetchingRemoteBranding) {
        isFetchingRemoteBranding = true;
        const API_BASE = window.location.origin.includes("localhost") ? "http://localhost:5000/api/v1" : "/api/v1";
        fetch(`${API_BASE}/crm/company-branding/default`)
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              const remote = res.data;
              const merged = { ...details, ...remote };
              localStorage.setItem("crm_global_company_details", JSON.stringify(merged));
              localStorage.setItem("global_crm_company_profile", JSON.stringify(merged));
            }
          })
          .catch(() => null);
      }

      return details;
    } catch (e) {}
  }
  return {
    companyName: "Speshway Solutions Private Limited",
    billedByCompany: "Speshway Solutions Private Limited",
    companyTagline: "Website & App Development Company - Hyderabad, India",
    billedBySub: "Software Development Company",
    companyEmail: "info@speshway.com",
    companyPhone: "+91 91000 06020",
    companyWebsite: "www.speshway.com",
    companyGstin: "36AAAAA0000A1Z5",
    companyAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
    billedByAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
    billedByContact: "info@speshway.com | +91 91000 06020 | www.speshway.com",
    pdfPrimaryColor: "#5D3ADF",
    pdfSecondaryColor: "#B8F7A1",
    companyLogoUrl: "/pdf-logo.png",
    companyWatermarkUrl: "/pdf-logo.png",
    showWatermark: true,
    companyWatermarkText: "SPESHWAY SOLUTIONS",
    companyWatermarkOpacity: 0.25,
    companyWatermarkContrast: 150,
    companyWatermarkGrayscale: false,
    companyWatermarkRotation: 0,
    companyWatermarkSize: 50,
    companyWatermarkImgSize: 290
  };
};

export const saveGlobalCompanyDetails = (details) => {
  if (typeof window !== "undefined") {
    try {
      const current = getGlobalCompanyDetails();
      const merged = { ...current, ...details };
      localStorage.setItem("crm_global_company_details", JSON.stringify(merged));
      localStorage.setItem("global_crm_company_profile", JSON.stringify(merged));
      if (details.companyLogoUrl) {
        localStorage.setItem("global_crm_company_logo", details.companyLogoUrl);
        localStorage.setItem("speshway_crm_company_logo", details.companyLogoUrl);
      }
      
      const API_BASE = window.location.origin.includes("localhost") ? "http://localhost:5000/api/v1" : "/api/v1";
      fetch(`${API_BASE}/crm/company-branding/default`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged)
      }).catch(() => null);

      window.dispatchEvent(new Event("crm:company-logo-updated"));
      return merged;
    } catch (e) {
      console.error("Error saving global company details", e);
    }
  }
  return details;
};

// Generate Exact Tax Invoice PDF HTML Matching User's PDF Image with Dynamic Branding, Colors & Watermark
export const generateSpeshwayTaxInvoicePdfHtml = (inv, proj, zoomScaleOverride) => {
  const activeZoom = zoomScaleOverride !== undefined ? zoomScaleOverride : (_optionalChain([inv, 'optionalAccess', _ => _.zoomScale]) !== undefined ? inv.zoomScale : 0.6);
  const invNumber = _optionalChain([inv, 'optionalAccess', _2 => _2.number]) || _optionalChain([inv, 'optionalAccess', _3 => _3.id]) || "SPW2026070712";
  
  const rawDate = _optionalChain([inv, 'optionalAccess', _4 => _4.date]) || _optionalChain([inv, 'optionalAccess', _5 => _5.dueDate]) || "2026-07-09";
  let invDateStr = "09 July, 2026";
  try {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleDateString('en-GB', { month: 'long' });
      const year = d.getFullYear();
      invDateStr = `${day} ${month}, ${year}`;
    } else {
      invDateStr = rawDate;
    }
  } catch (e2) {
    invDateStr = rawDate;
  }

  const defaults = getGlobalCompanyDetails();
  const billedByCompany = normalizePdfDisplayText(_optionalChain([inv, 'optionalAccess', _6 => _6.billedByCompany]) || _optionalChain([inv, 'optionalAccess', _7 => _7.companyName]) || defaults.billedByCompany, "Speshway Solutions Private Limited");
  const billedBySubHeader = normalizePdfDisplayText(_optionalChain([inv, 'optionalAccess', _8 => _8.companyHeaderSub]) || _optionalChain([inv, 'optionalAccess', _9 => _9.companyTagline]) || _optionalChain([inv, 'optionalAccess', _10 => _10.billedBySub]) || defaults.companyTagline, "IT Services & Software Development - Hyderabad, India");
  const billedBySub = normalizePdfDisplayText(_optionalChain([inv, 'optionalAccess', _11 => _11.billedBySub]) || _optionalChain([inv, 'optionalAccess', _12 => _12.companyTagline]) || defaults.billedBySub, "Software Development Company");
  const companyAddress = normalizePdfDisplayText(_optionalChain([inv, 'optionalAccess', _13 => _13.billedByAddress]) || _optionalChain([inv, 'optionalAccess', _14 => _14.companyAddress]) || defaults.companyAddress, "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081");
  const companyEmail = _optionalChain([inv, 'optionalAccess', _15 => _15.companyEmail]) || defaults.companyEmail || "info@speshway.com";
  const companyPhone = _optionalChain([inv, 'optionalAccess', _16 => _16.companyPhone]) || defaults.companyPhone || "+91 91000 06020";
  const companyWebsite = _optionalChain([inv, 'optionalAccess', _17 => _17.companyWebsite]) || defaults.companyWebsite || "www.speshway.com";
  
  const billedToClient = normalizePdfDisplayText(_optionalChain([inv, 'optionalAccess', _18 => _18.clientName]) || _optionalChain([inv, 'optionalAccess', _19 => _19.billedToClient]) || _optionalChain([proj, 'optionalAccess', _20 => _20.clientName]), "Client");
  const billedToProduct = normalizePdfDisplayText(_optionalChain([inv, 'optionalAccess', _21 => _21.productName]) || _optionalChain([inv, 'optionalAccess', _22 => _22.billedToProduct]) || _optionalChain([proj, 'optionalAccess', _23 => _23.name]) || _optionalChain([inv, 'optionalAccess', _24 => _24.title]), "Software Project");
  
  const description = _optionalChain([inv, 'optionalAccess', _25 => _25.description]) || `${billedToProduct} Web & Mobile Application`;
  const subdesc = _optionalChain([inv, 'optionalAccess', _26 => _26.subdesc]) || `Design, development & delivery of web and mobile applications for the ${billedToProduct} product, provided to ${billedToClient}`;
  
  let rate = Number(_optionalChain([inv, 'optionalAccess', _27 => _27.rate]) || _optionalChain([inv, 'optionalAccess', _28 => _28.amount]) || 0);
  const taxPct = Number(_optionalChain([inv, 'optionalAccess', _29 => _29.taxPct]) !== undefined ? inv.taxPct : (_optionalChain([inv, 'optionalAccess', _30 => _30.tax]) !== undefined ? inv.tax : 18));

  if (!rate && _optionalChain([inv, 'optionalAccess', _31 => _31.totalDue])) {
    rate = taxPct > 0 ? Math.round(Number(inv.totalDue) / (1 + taxPct / 100)) : Number(inv.totalDue);
  } else if (!rate) {
    rate = 50000;
  }

  const amount = rate;
  const taxAmount = taxPct > 0 ? Math.round(amount * (taxPct / 100)) : 0;
  const totalDue = amount + taxAmount;
  
  const amountInWordsStr = _optionalChain([inv, 'optionalAccess', _32 => _32.amountInWords]) || numberToWords(totalDue);
  
  const accountName = _optionalChain([inv, 'optionalAccess', _33 => _33.accountName]) || "SPESHWAY SOLUTIONS PRIVATE LIMITED";
  const accountNumber = _optionalChain([inv, 'optionalAccess', _34 => _34.accountNumber]) || "018326900000850";
  const branch = _optionalChain([inv, 'optionalAccess', _35 => _35.branch]) || "HITECH CITY";
  const ifscCode = _optionalChain([inv, 'optionalAccess', _36 => _36.ifscCode]) || "YESB0000183";

  const primaryColor = _optionalChain([inv, 'optionalAccess', _37 => _37.pdfPrimaryColor]) || "#003b8e";
  const titleColor = _optionalChain([inv, 'optionalAccess', _38 => _38.pdfPrimaryColor]) || "#0c397d";
  const brandAccent = _optionalChain([inv, 'optionalAccess', _39 => _39.pdfSecondaryColor]) || "#d97706";

  const bodyFont = _optionalChain([inv, 'optionalAccess', _40 => _40.pdfBodyFont]) || "Segoe UI";
  const headingFont = _optionalChain([inv, 'optionalAccess', _41 => _41.pdfHeadingFont]) || _optionalChain([inv, 'optionalAccess', _42 => _42.pdfBodyFont]) || "Segoe UI";

  const globalDefaults = getGlobalCompanyDetails();
  let logoUrl = _optionalChain([inv, 'optionalAccess', _43 => _43.companyLogoUrl]) !== undefined && inv.companyLogoUrl !== "/logo.png" && inv.companyLogoUrl !== "/logo.jpg" ? inv.companyLogoUrl : (globalDefaults.companyLogoUrl || "/pdf-logo.png");
  if (!logoUrl || logoUrl === "/logo.png" || logoUrl === "/logo.jpg" || logoUrl.endsWith("/logo.png") || logoUrl.endsWith("/logo.jpg")) {
    logoUrl = "/pdf-logo.png";
  }
  if (logoUrl && logoUrl.startsWith("/") && typeof window !== "undefined") {
    logoUrl = window.location.origin + logoUrl;
  }
  const email = _optionalChain([inv, 'optionalAccess', _44 => _44.companyEmail]) || globalDefaults.companyEmail || "info@speshway.com";
  const website = _optionalChain([inv, 'optionalAccess', _45 => _45.companyWebsite, 'optionalAccess', _46 => _46.trim, 'call', _47 => _47()]) || globalDefaults.companyWebsite || "www.speshway.com";
  const address = _optionalChain([inv, 'optionalAccess', _48 => _48.companyAddress]) || globalDefaults.companyAddress || globalDefaults.billedByAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032";
  const footerName = _optionalChain([inv, 'optionalAccess', _49 => _49.companyFooterName, 'optionalAccess', _50 => _50.trim, 'call', _51 => _51()]) || billedByCompany;
  const footerAddress = _optionalChain([inv, 'optionalAccess', _52 => _52.companyFooterAddress, 'optionalAccess', _53 => _53.trim, 'call', _54 => _54()]) || address;
  const footerContact = _optionalChain([inv, 'optionalAccess', _55 => _55.companyFooterContact, 'optionalAccess', _56 => _56.trim, 'call', _57 => _57()]) || `${website} - ${email} - ${companyPhone}`;

  // Watermark options
  const showWatermark = _optionalChain([inv, 'optionalAccess', _58 => _58.showWatermark]) !== undefined 
    ? Boolean(inv.showWatermark) 
    : (_optionalChain([inv, 'optionalAccess', _59 => _59.enableWatermark]) !== undefined ? Boolean(inv.enableWatermark) : true);

  let watermarkUrl = _optionalChain([inv, 'optionalAccess', _60 => _60.companyWatermarkUrl]) !== undefined && inv.companyWatermarkUrl !== "/logo.png" && inv.companyWatermarkUrl !== "/logo.jpg" ? inv.companyWatermarkUrl : (globalDefaults.companyWatermarkUrl || "/pdf-logo.png");
  if (!watermarkUrl || watermarkUrl === "/logo.png" || watermarkUrl === "/logo.jpg" || watermarkUrl.endsWith("/logo.png") || watermarkUrl.endsWith("/logo.jpg")) {
    watermarkUrl = "/pdf-logo.png";
  }
  const watermarkText = _optionalChain([inv, 'optionalAccess', _61 => _61.companyWatermarkText]) || globalDefaults.companyWatermarkText || (billedByCompany ? billedByCompany.toUpperCase() : "SPESHWAY SOLUTIONS");
  const watermarkOpacity = _optionalChain([inv, 'optionalAccess', _62 => _62.companyWatermarkOpacity]) !== undefined ? inv.companyWatermarkOpacity : 0.08;
  const watermarkRotation = 0; // Fixed horizontal 0deg
  const watermarkContrast = _optionalChain([inv, 'optionalAccess', _63 => _63.companyWatermarkContrast]) !== undefined ? inv.companyWatermarkContrast : 100;
  const watermarkGrayscale = _optionalChain([inv, 'optionalAccess', _64 => _64.companyWatermarkGrayscale]) !== false;
  const watermarkSize = _optionalChain([inv, 'optionalAccess', _65 => _65.companyWatermarkSize]) || _optionalChain([inv, 'optionalAccess', _66 => _66.watermarkSize]) || 26;
  const watermarkImgSize = _optionalChain([inv, 'optionalAccess', _67 => _67.companyWatermarkImgSize]) || _optionalChain([inv, 'optionalAccess', _68 => _68.watermarkImgSize]) || 220;

  const imgFilterStyle = watermarkGrayscale
    ? `filter: grayscale(100%) contrast(${watermarkContrast}%);`
    : `filter: contrast(${watermarkContrast}%);`;

  const watermarkHtml = (showWatermark && (watermarkUrl || watermarkText)) ? `
    <div class="watermark-bg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(${watermarkRotation}deg); opacity: ${watermarkOpacity}; pointer-events: none; z-index: 1; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;">
      ${watermarkUrl ? `<img src="${watermarkUrl}" alt="Watermark" style="max-width: ${watermarkImgSize}px; max-height: ${Math.round(watermarkImgSize * 0.75)}px; object-fit: contain; ${imgFilterStyle}" />` : ''}
      ${watermarkText ? `<div class="watermark-text" style="font-family: '${headingFont}', sans-serif; font-size: ${watermarkSize}px; font-weight: 900; color: ${primaryColor}; letter-spacing: 2.5px; text-transform: uppercase;">${watermarkText}</div>` : ''}
    </div>
  ` : '';

  const logoSize = _optionalChain([inv, 'optionalAccess', _69 => _69.companyLogoSize]) || _optionalChain([inv, 'optionalAccess', _70 => _70.logoSize]) || 38;
  const logoHtml = getHeaderLogoHtml(logoUrl, billedByCompany, primaryColor, logoSize, 140, 8);

  const formatINR = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${billedByCompany} - ${billedToClient} - TAX INVOICE - ${invNumber}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;600;700;800&family=Outfit:wght@500;700;800;900&family=Playfair+Display:wght@700;800;900&family=Poppins:wght@400;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important; 
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: optimizeLegibility !important;
      image-rendering: -webkit-optimize-contrast !important;
      letter-spacing: 0.012em;
      word-spacing: 0.06em;
    }
    body, html, div, p, span, td, th, h1, h2, h3, h4, h5, h6, strong, b, label, small {
      color: #0f172a;
    }
    .header-bar, .header-bar *, .items-table th, .items-table th * {
      color: #ffffff !important;
    }
    @page { size: A4 portrait; margin: 10mm 14mm; }
    @media print {
      html, body { width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; background: #ffffff !important; box-shadow: none !important; transform: none !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
    html {
      margin: 0;
      padding: 12px 0;
      background: #0f172a;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      overflow-x: hidden !important;
      box-sizing: border-box;
    }
    .pdf-page { 
      background: #ffffff !important;
      color: #0f172a !important;
      line-height: 1.45;
      padding: 36px 52px 32px 52px;
      width: 794px !important;
      max-width: 794px !important;
      height: 1123px;
      min-height: 1123px;
      margin: 0 auto 16px auto !important;
      font-family: '${bodyFont}', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      position: relative;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: geometricPrecision !important;
      image-rendering: -webkit-optimize-contrast !important;
      backface-visibility: hidden !important;
      -webkit-backface-visibility: hidden !important;
      box-sizing: border-box;
      border-radius: 0;
      box-shadow: none;
      overflow: hidden;
      ${activeZoom !== 1 ? `transform: scale(${activeZoom}) translateZ(0); transform-origin: top center; margin-bottom: -${Math.round(1123 * (1 - activeZoom))}px !important;` : ''}
    }

    h1, h2, h3, .main-title { font-family: '${headingFont}', '${bodyFont}', sans-serif; }

    .content-wrapper { 
      position: relative; 
      z-index: 2; 
      padding: 0 6px; 
      min-height: 1048px; 
      display: flex; 
      flex-direction: column; 
      justify-content: space-between;
    }

    .main-body-content { flex: 1; }

    /* HEADER BANNER */
    .header-bar { 
      background: ${primaryColor}; 
      color: #ffffff; 
      padding: 16px 26px; 
      border-radius: 8px; 
      display: flex; 
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .header-left { display: flex; align-items: center; gap: 16px; min-width: 0; flex: 1; padding-right: 18px; }
    .header-icon {
      background: #ffffff; 
      width: 36px; 
      height: 36px; 
      border-radius: 8px; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      flex-shrink: 0;
    }
    .header-company-copy { min-width: 0; flex: 1; }
    .header-bar h1 { font-size: 16px; font-weight: 800; letter-spacing: 0; text-transform: uppercase; color: #ffffff; margin: 0; line-height: 1.25; display: block; word-spacing: 2px; }
    .header-bar p { font-size: 10.5px; color: #e0f2fe; margin-top: 4px; font-weight: 600; line-height: 1.35; display: block; word-spacing: 2px; }

    /* TITLE ROW */
    .title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 24px; margin-bottom: 22px; padding: 0 4px; }
    .main-title { font-size: 21px; font-weight: 800; color: ${titleColor}; letter-spacing: 0.5px; line-height: 1.3; display: block; }
    .inv-meta { text-align: right; font-size: 11.5px; color: #64748b; line-height: 1.55; }
    .inv-meta div { display: block; margin-bottom: 3px; }
    .inv-meta strong { color: #0f172a; font-weight: 800; }

    /* CARDS ROW */
    .cards-row { display: flex; gap: 20px; margin-bottom: 24px; }
    .info-card { flex: 1; min-width: 0; background: rgba(248, 250, 252, 0.76); border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .card-label { text-transform: uppercase; font-size: 9.5px; font-weight: 800; color: ${brandAccent}; letter-spacing: 0.6px; margin-bottom: 5px; display: block; line-height: 1.2; }
    .card-title { font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1.35; display: block; margin-bottom: 3px; word-break: break-word; }
    .card-sub { font-size: 11px; color: #475569; margin-top: 2px; line-height: 1.4; display: block; word-break: break-word; }

    /* ITEMS TABLE */
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 22px; }
    .items-table th { background: ${titleColor}; color: #ffffff; text-align: left; padding: 12px 18px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
    .items-table td { padding: 16px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12.5px; }
    .desc-title { font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1.35; display: block; margin-bottom: 4px; word-break: break-word; }
    .desc-sub { font-size: 11px; color: #64748b; margin-top: 2px; line-height: 1.45; display: block; word-break: break-word; }

    /* TOTALS SUMMARY */
    .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; padding-right: 4px; }
    .summary-box { width: 330px; text-align: right; }
    .summary-row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 13px; color: #475569; }
    .summary-row.total { font-size: 16px; font-weight: 800; color: ${titleColor}; border-top: 2px solid ${titleColor}; padding-top: 10px; margin-top: 6px; }

    /* AMOUNT IN WORDS */
    .words-box { background: rgba(248, 250, 252, 0.76); border: 1px solid #e2e8f0; border-left: 4px solid ${brandAccent}; padding: 14px 20px; border-radius: 0 10px 10px 0; font-size: 11.5px; color: #334155; margin-bottom: 24px; }

    /* BANK DETAILS */
    .bank-card { background: rgba(248, 250, 252, 0.76); border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; margin-bottom: 22px; }
    .bank-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px; }
    .bank-item label { display: block; font-size: 9px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 3px; letter-spacing: 0.5px; }
    .bank-item span { font-weight: 800; color: #0f172a; font-size: 12px; }

    /* FOOTER AT DOWNSIDE */
    .footer { 
      margin-top: auto; 
      text-align: center; 
      border-top: 1px solid #e2e8f0; 
      padding-top: 18px; 
      padding-bottom: 6px;
      font-size: 10px; 
      color: #64748b; 
      line-height: 1.6; 
    }
  </style>
<body style="margin: 0; padding: 12px 0; background: #0f172a; width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow-x: hidden; box-sizing: border-box;">
<div class="pdf-page" style="width: 794px; height: 1123px; min-height: 1123px; background: #ffffff !important; color: #0f172a !important; position: relative; box-sizing: border-box;">

  ${watermarkHtml}

  <div class="content-wrapper" style="position: relative; z-index: 2; min-height: 1048px; display: flex; flex-direction: column; justify-content: space-between; background: transparent;">
    <div class="main-body-content">

      <!-- HEADER BANNER -->
      <div class="header-bar" style="background: ${primaryColor} !important; color: #ffffff !important; padding: 15px 22px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <div class="header-left" style="display: flex; align-items: center; gap: 16px; min-width: 0; flex: 1; padding-right: 18px;">
          ${logoHtml}
          <div class="header-company-copy" style="min-width: 0; flex: 1;">
            <h1 style="font-size: 16px; font-weight: 800; letter-spacing: 0; text-transform: uppercase; color: #ffffff !important; margin: 0; line-height: 1.25; display: block; word-spacing: 2px;">${billedByCompany}</h1>
            <p style="font-size: 10.5px; color: #e0f2fe !important; margin-top: 4px; font-weight: 600; line-height: 1.35; display: block; word-spacing: 2px;">${billedBySubHeader}</p>
          </div>
        </div>
        <div style="text-align: right; flex: 0 0 170px;">
          <div class="main-title" style="font-size: 21px; font-weight: 800; color: #ffffff !important; letter-spacing: 0; line-height: 1.2; display: block;">TAX INVOICE</div>
          <div style="font-size: 10px; color: #e0f2fe !important; margin-top: 4px; font-weight: 700; font-family: monospace;">${invNumber}</div>
        </div>
      </div>

      <!-- TITLE & META -->
      <div class="title-row" style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 24px; margin-bottom: 22px; padding: 0 4px;">
        <div class="main-title" style="font-size: 21px; font-weight: 800; color: ${titleColor} !important; letter-spacing: 0.5px; line-height: 1.3; display: block;">TAX INVOICE</div>
        <div class="inv-meta" style="text-align: right; font-size: 11.5px; color: #64748b !important; line-height: 1.55;">
          <div style="color: #64748b !important;">Invoice No: <strong style="color: #0f172a !important; font-weight: 800;">${invNumber}</strong></div>
          <div style="color: #64748b !important;">Date: <strong style="color: #0f172a !important; font-weight: 800;">${invDateStr}</strong></div>
        </div>
      </div>

      <!-- BILLED BY & BILLED TO -->
      <div class="cards-row" style="display: flex; gap: 20px; margin-bottom: 24px;">
        <div class="info-card" style="flex: 1; min-width: 0; background: rgba(248, 250, 252, 0.76) !important; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <div class="card-label" style="text-transform: uppercase; font-size: 9.5px; font-weight: 800; color: ${brandAccent} !important; letter-spacing: 0.6px; margin-bottom: 5px; display: block; line-height: 1.2;">BILLED BY</div>
          <div class="card-title" style="font-size: 13px; font-weight: 800; color: #0f172a !important; line-height: 1.35; display: block; margin-bottom: 3px; word-break: break-word;">${billedByCompany}</div>
          <div class="card-sub" style="font-size: 11px; color: #475569 !important; margin-top: 2px; line-height: 1.4; display: block; word-break: break-word;">${billedBySub}</div>
        </div>
        <div class="info-card" style="flex: 1; min-width: 0; background: rgba(248, 250, 252, 0.76) !important; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <div class="card-label" style="text-transform: uppercase; font-size: 9.5px; font-weight: 800; color: ${brandAccent} !important; letter-spacing: 0.6px; margin-bottom: 5px; display: block; line-height: 1.2;">BILLED TO</div>
          <div class="card-title" style="font-size: 13px; font-weight: 800; color: #0f172a !important; line-height: 1.35; display: block; margin-bottom: 3px; word-break: break-word;">${billedToClient}</div>
          <div class="card-sub" style="font-size: 11px; color: #475569 !important; margin-top: 2px; line-height: 1.4; display: block; word-break: break-word;">Product: ${billedToProduct}</div>
        </div>
      </div>

      <!-- ITEMS TABLE -->
      <table class="items-table" style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
        <thead>
          <tr>
            <th style="width: 56%; text-align: left; background: ${titleColor} !important; color: #ffffff !important; padding: 12px 18px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">DESCRIPTION</th>
            <th style="width: 22%; text-align: right; background: ${titleColor} !important; color: #ffffff !important; padding: 12px 18px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">RATE (INR)</th>
            <th style="width: 22%; text-align: right; background: ${titleColor} !important; color: #ffffff !important; padding: 12px 18px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">AMOUNT (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 16px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12.5px; vertical-align: top;">
              <div class="desc-title" style="font-size: 13px; font-weight: 800; color: #0f172a !important; line-height: 1.35; display: block; margin-bottom: 4px; word-break: break-word;">${description}</div>
              <div class="desc-sub" style="font-size: 11px; color: #64748b !important; margin-top: 2px; line-height: 1.45; display: block; word-break: break-word;">${subdesc}</div>
            </td>
            <td style="padding: 16px 18px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 13px; font-weight: 700; color: #0f172a !important; vertical-align: top; white-space: nowrap;">
              ${formatINR(rate)}
            </td>
            <td style="padding: 16px 18px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 13px; font-weight: 700; color: #0f172a !important; vertical-align: top; white-space: nowrap;">
              ${formatINR(amount)}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- SUMMARY TOTALS -->
      <div class="summary-section" style="display: flex; justify-content: flex-end; margin-bottom: 24px; padding-right: 4px;">
        <div class="summary-box" style="width: 330px; text-align: right;">
          <div class="summary-row" style="display: flex; justify-content: space-between; padding: 7px 0; font-size: 13px; color: #475569 !important;">
            <span style="color: #475569 !important;">Subtotal</span>
            <span style="color: #0f172a !important; font-weight: 700; font-size: 13px;">₹ ${formatINR(amount)}</span>
          </div>
          <div class="summary-row" style="display: flex; justify-content: space-between; padding: 7px 0; font-size: 13px; color: #475569 !important;">
            <span style="color: #475569 !important;">Tax (${taxPct}%)</span>
            <span style="color: #0f172a !important; font-weight: 700; font-size: 13px;">₹ ${formatINR(taxAmount)}</span>
          </div>
          <div class="summary-row total" style="display: flex; justify-content: space-between; padding: 7px 0; font-size: 16px; font-weight: 800; color: ${titleColor} !important; border-top: 2px solid ${titleColor}; padding-top: 10px; margin-top: 6px;">
            <span style="color: ${titleColor} !important;">Total Due</span>
            <span style="font-size: 17px; font-weight: 900; color: ${titleColor} !important;">₹ ${formatINR(totalDue)}</span>
          </div>
        </div>
      </div>

      <!-- AMOUNT IN WORDS -->
      <div class="words-box" style="background: rgba(248, 250, 252, 0.76) !important; border: 1px solid #e2e8f0; border-left: 4px solid ${brandAccent}; padding: 14px 20px; border-radius: 0 10px 10px 0; font-size: 11.5px; color: #334155 !important; margin-bottom: 24px;">
        <strong style="color: #0f172a !important;">Amount in Words:</strong> <span style="color: #334155 !important;">${amountInWordsStr}</span>
      </div>

      <!-- BANK DETAILS -->
      <div class="bank-card" style="background: rgba(248, 250, 252, 0.76) !important; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; margin-bottom: 22px;">
        <div class="card-label" style="text-transform: uppercase; font-size: 9.5px; font-weight: 800; color: ${brandAccent} !important; letter-spacing: 0.6px; margin-bottom: 8px; display: block; line-height: 1.2;">BANK DETAILS FOR PAYMENT</div>
        <div class="bank-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px;">
          <div class="bank-item">
            <label style="display: block; font-size: 9px; text-transform: uppercase; font-weight: 700; color: #64748b !important; margin-bottom: 3px; letter-spacing: 0.5px;">ACCOUNT NAME</label>
            <span style="font-weight: 800; color: #0f172a !important; font-size: 12px;">${accountName}</span>
          </div>
          <div class="bank-item">
            <label style="display: block; font-size: 9px; text-transform: uppercase; font-weight: 700; color: #64748b !important; margin-bottom: 3px; letter-spacing: 0.5px;">BRANCH</label>
            <span style="font-weight: 800; color: #0f172a !important; font-size: 12px;">${branch}</span>
          </div>
          <div class="bank-item">
            <label style="display: block; font-size: 9px; text-transform: uppercase; font-weight: 700; color: #64748b !important; margin-bottom: 3px; letter-spacing: 0.5px;">ACCOUNT NUMBER</label>
            <span style="font-weight: 800; color: #0f172a !important; font-size: 12px;">${accountNumber}</span>
          </div>
          <div class="bank-item">
            <label style="display: block; font-size: 9px; text-transform: uppercase; font-weight: 700; color: #64748b !important; margin-bottom: 3px; letter-spacing: 0.5px;">IFSC CODE</label>
            <span style="font-weight: 800; color: #0f172a !important; font-size: 12px;">${ifscCode}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- FOOTER AT DOWNSIDE -->
    <div class="footer" style="margin-top: auto; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 18px; padding-bottom: 6px; font-size: 10px; color: #64748b !important; line-height: 1.6;">
      <div style="font-weight: 800; font-size: 11px; color: #334155 !important; margin-bottom: 3px;">${footerName}</div>
      <div style="color: #64748b !important;">${footerAddress} ${footerContact}</div>
    </div>

  </div>
</div>
</body>
</html>`;
};

export const generateSpeshwayEstimationPdfHtml = (arg1, arg2, arg3, arg4Zoom) => {
  let project = null;
  let quote = null;
  let projectFeaturesList = [];

  if (arg1 && (arg1.planAPrice !== undefined || arg1.planBPrice !== undefined || arg1.documentRef || arg1.overviewNarrative || arg1.serviceItems || arg1.number)) {
    quote = arg1;
    project = arg2 || { name: quote.projectName || quote.title, clientName: quote.clientName };
    projectFeaturesList = (Array.isArray(arg3) && arg3.length > 0) ? arg3 : (_optionalChain([quote, 'optionalAccess', _71 => _71.customFeatures]) || _optionalChain([quote, 'optionalAccess', _72 => _72.projectFeaturesList]) || _optionalChain([quote, 'optionalAccess', _73 => _73.features]) || []);
  } else {
    project = arg1 || {};
    quote = arg2 || arg1 || {};
    projectFeaturesList = (Array.isArray(arg3) && arg3.length > 0) ? arg3 : (_optionalChain([quote, 'optionalAccess', _74 => _74.customFeatures]) || _optionalChain([quote, 'optionalAccess', _75 => _75.projectFeaturesList]) || _optionalChain([quote, 'optionalAccess', _76 => _76.features]) || []);
  }

  const activeZoom = arg4Zoom !== undefined ? arg4Zoom : (_optionalChain([quote, 'optionalAccess', _77 => _77.zoomScale]) !== undefined ? quote.zoomScale : 0.6);

  const projName = normalizePdfDisplayText(_optionalChain([project, 'optionalAccess', _78 => _78.name]) || _optionalChain([quote, 'optionalAccess', _79 => _79.projectName]), "Software Solution");
  const clientName = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _80 => _80.clientName]) || _optionalChain([project, 'optionalAccess', _81 => _81.clientName]), "Valued Client");
  const docTitle = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _82 => _82.title]) || `${projName} Quotation`, "Event & Service Marketplace Platform");
  const docRef = _optionalChain([quote, 'optionalAccess', _83 => _83.documentRef]) || `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/2026`;
  const currencySymbol = (_optionalChain([quote, 'optionalAccess', _84 => _84.currency]) || "").includes("INR") || !(_optionalChain([quote, 'optionalAccess', _85 => _85.currency]) || "").includes("$") ? "₹" : "$";
  const planAName = _optionalChain([quote, 'optionalAccess', _86 => _86.planAName]) || "PLAN A — Web Platform Only";
  const planAPrice = _optionalChain([quote, 'optionalAccess', _87 => _87.planAPrice]) || 50000;
  const planBName = _optionalChain([quote, 'optionalAccess', _88 => _88.planBName]) || "PLAN B — Web + Mobile App";
  const planBPrice = _optionalChain([quote, 'optionalAccess', _89 => _89.planBPrice]) || 65000;
  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const projectType = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _90 => _90.projectType]) || _optionalChain([quote, 'optionalAccess', _91 => _91.category]), 'Web Application');
  const currency = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _92 => _92.currency]), 'Indian Rupees (INR)');

  const featItems = (projectFeaturesList && projectFeaturesList.length > 0) ? projectFeaturesList : [
    { title: "Ticketed Events", description: "Buy tickets for concerts, festivals, shows — with tiered pricing (e.g. Silver, Gold, Diamond) and session options (Day/Night)." },
    { title: "Service Hiring", description: "Hire event professionals (decorators, caterers, bands, venues) with custom requirements such as guest count and add-ons." },
    { title: "Secure Payments", description: "Online payments — full or partial advance/deposit — via card or UPI." },
    { title: "QR Ticket Check-In", description: "Each ticket carries a unique QR code, scanned at entry to validate authenticity and prevent fake tickets." },
    { title: "In-App Chat", description: "Direct messaging between customers and merchants for coordination and queries." },
    { title: "Ratings & Reviews", description: "1–5 star rating and review system after a completed booking." },
    { title: "AI Recommendations", description: "Personalized event suggestions based on each customer's past activity." },
    { title: "Promo Codes & Marketing", description: "Merchants can create discount codes and send promotional alerts to boost sales." },
    { title: "Invoices", description: "Downloadable / printable PDF receipt or invoice for every booking." },
    { title: "Cart & Checkout", description: "Add multiple events/services to a cart and complete a single combined checkout & payment." },
    { title: "Cancellation", description: "Customers can cancel a booking, with cancellation fees applied as per platform policy." },
    { title: "Merchant Dashboard", description: "List & sell, manage bookings, collect payments, check in guests, market business, withdraw earnings, track performance." },
    { title: "Admin Panel", description: "Merchant approvals, commission control, refunds & withdrawals, dispute resolution, user management, CMS & analytics dashboard." }
  ];

  const featureRowsHtml = featItems.map((feat, idx) => `
    <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#f9fafb'}; border-bottom: 1px solid #f3f4f6;">
      <td style="padding: 8px 10px; font-size: 10px; font-weight: 700; color: #6d28d9;">${idx + 1}</td>
      <td style="padding: 8px 10px; font-size: 10px; font-weight: 700; color: #1e1b4b;">${feat.title}</td>
      <td style="padding: 8px 10px; font-size: 10px; color: #4b5563; line-height: 1.4;">${feat.description || 'Feature requirement details included in scope.'}</td>
    </tr>
  `).join('');

  const defaultOverviewText = `${projName} is a comprehensive digital solution designed to streamline client workflows, automate service bookings, track financial transactions, and optimize administration.`;
  const overviewText = sanitizeTextContent(_optionalChain([quote, 'optionalAccess', _93 => _93.overviewNarrative]) || _optionalChain([project, 'optionalAccess', _94 => _94.description]), defaultOverviewText);

  const customerDesc = sanitizeTextContent(_optionalChain([quote, 'optionalAccess', _95 => _95.customerDesc]), "Buys tickets or hires services, adds multiple items to a cart, and checks out together in a single transaction.");
  const merchantDesc = sanitizeTextContent(_optionalChain([quote, 'optionalAccess', _96 => _96.merchantDesc]), "Sells tickets/services, manages bookings, markets their business, and earns money through the platform.");
  const adminDesc = sanitizeTextContent(_optionalChain([quote, 'optionalAccess', _97 => _97.adminDesc]), "Owns and controls the platform — approves merchants, earns commission, and keeps the ecosystem safe.");
  
  const defaults = getGlobalCompanyDetails();
  const billedByCompany = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _98 => _98.companyName]) || defaults.billedByCompany, "Speshway Solutions Private Limited");
  const billedBySubHeader = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _99 => _99.companyTagline]) || defaults.companyTagline || defaults.billedBySub, "Website & App Development Company - Hyderabad, India");
  const compAddress = normalizePdfDisplayText(_optionalChain([quote, 'optionalAccess', _100 => _100.companyAddress]) || defaults.companyAddress, "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081");
  const compEmail = _optionalChain([quote, 'optionalAccess', _101 => _101.companyEmail]) || defaults.companyEmail || "info@speshway.com";
  const compPhone = _optionalChain([quote, 'optionalAccess', _102 => _102.companyPhone]) || defaults.companyPhone || "+91 91000 06020";
  const compWebsite = _optionalChain([quote, 'optionalAccess', _103 => _103.companyWebsite, 'optionalAccess', _104 => _104.trim, 'call', _105 => _105()]) || defaults.companyWebsite || "www.speshway.com";
  const footerName = _optionalChain([quote, 'optionalAccess', _106 => _106.companyFooterName, 'optionalAccess', _107 => _107.trim, 'call', _108 => _108()]) || billedByCompany;
  const footerAddress = _optionalChain([quote, 'optionalAccess', _109 => _109.companyFooterAddress, 'optionalAccess', _110 => _110.trim, 'call', _111 => _111()]) || compAddress;
  const footerContact = _optionalChain([quote, 'optionalAccess', _112 => _112.companyFooterContact, 'optionalAccess', _113 => _113.trim, 'call', _114 => _114()]) || `${compEmail} - ${compPhone} - ${compWebsite}`;

  const compName = billedByCompany;
  const compTagline = billedBySubHeader;
  const pdfPrimaryColor = _optionalChain([quote, 'optionalAccess', _115 => _115.pdfPrimaryColor]) || defaults.pdfPrimaryColor || "#8b1e1e";
  const pdfSecondaryColor = _optionalChain([quote, 'optionalAccess', _116 => _116.pdfSecondaryColor]) || defaults.pdfSecondaryColor || "#991b1b";
  let logoUrl = _optionalChain([quote, 'optionalAccess', _117 => _117.companyLogoUrl]) !== undefined && quote.companyLogoUrl !== "/logo.png" && quote.companyLogoUrl !== "/logo.jpg" ? quote.companyLogoUrl : (defaults.companyLogoUrl || "/pdf-logo.png");
  if (!logoUrl || logoUrl === "/logo.png" || logoUrl === "/logo.jpg" || logoUrl.endsWith("/logo.png") || logoUrl.endsWith("/logo.jpg")) {
    logoUrl = "/pdf-logo.png";
  }
  if (logoUrl && logoUrl.startsWith("/") && typeof window !== "undefined") {
    logoUrl = window.location.origin + logoUrl;
  }
  const quoteLogoHtml = getHeaderLogoHtml(logoUrl, compName, pdfPrimaryColor, 40, 132, 8);
  const quoteSmallLogoHtml = getHeaderLogoHtml(logoUrl, compName, pdfPrimaryColor, 34, 114, 7);
  let watermarkImg = _optionalChain([quote, 'optionalAccess', _118 => _118.companyWatermarkUrl]) !== undefined && quote.companyWatermarkUrl !== "/logo.png" && quote.companyWatermarkUrl !== "/logo.jpg" ? quote.companyWatermarkUrl : (defaults.companyWatermarkUrl || "/pdf-logo.png");
  if (!watermarkImg || watermarkImg === "/logo.png" || watermarkImg === "/logo.jpg" || watermarkImg.endsWith("/logo.png") || watermarkImg.endsWith("/logo.jpg")) {
    watermarkImg = "/pdf-logo.png";
  }
  const watermarkText = _optionalChain([quote, 'optionalAccess', _119 => _119.companyWatermarkText]) || defaults.companyWatermarkText || _optionalChain([quote, 'optionalAccess', _120 => _120.companyName]) || compName;
  const watermarkOpacity = _nullishCoalesce(_optionalChain([quote, 'optionalAccess', _121 => _121.companyWatermarkOpacity]), () => ( 0.08));
  const watermarkContrast = _nullishCoalesce(_optionalChain([quote, 'optionalAccess', _122 => _122.companyWatermarkContrast]), () => ( 150));
  const watermarkGrayscale = _optionalChain([quote, 'optionalAccess', _123 => _123.companyWatermarkGrayscale]) !== false;
  const watermarkRotation = 0; // Fixed horizontal 0deg
  const watermarkSize = _nullishCoalesce(_optionalChain([quote, 'optionalAccess', _124 => _124.companyWatermarkSize]), () => ( 26));
  const watermarkImgSize = _nullishCoalesce(_optionalChain([quote, 'optionalAccess', _125 => _125.companyWatermarkImgSize]), () => ( 220));

  const imgFilterStyle = watermarkGrayscale
    ? `filter: grayscale(100%) contrast(${watermarkContrast}%);`
    : `filter: contrast(${watermarkContrast}%);`;

  const showWatermark = _optionalChain([quote, 'optionalAccess', _126 => _126.showWatermark]) !== undefined 
    ? Boolean(quote.showWatermark) 
    : (_optionalChain([quote, 'optionalAccess', _127 => _127.enableWatermark]) !== undefined ? Boolean(quote.enableWatermark) : true);

  const watermarkHtml = (showWatermark && (watermarkImg || watermarkText)) ? `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(${watermarkRotation}deg); opacity: ${watermarkOpacity}; pointer-events: none; width: 600px; text-align: center; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
      ${watermarkImg ? `<img src="${watermarkImg}" style="max-width: ${watermarkImgSize}px; max-height: ${Math.round(watermarkImgSize * 0.78)}px; object-fit: contain; ${imgFilterStyle} display: block; margin: 0 auto 4px auto;" />` : ''}
      <div style="font-family: 'Times New Roman', Times, serif !important; font-size: ${watermarkSize}px; font-weight: 800; color: ${pdfPrimaryColor}; letter-spacing: 2px; text-transform: uppercase; line-height: 1.1; ${imgFilterStyle}">
        ${watermarkText}
      </div>
    </div>
  ` : '';

  const cleanPaymentTerms = sanitizeTextContent(_optionalChain([quote, 'optionalAccess', _128 => _128.paymentTerms]));
  const paymentTermsListHtml = (cleanPaymentTerms && cleanPaymentTerms.trim()) 
    ? cleanPaymentTerms.split('\n').filter((l) => l.trim()).map((l) => `<li>${l}</li>`).join('')
    : `
      <li><strong>40% advance</strong> on project kick-off</li>
      <li><strong>30%</strong> on completion of core module development & UAT build</li>
      <li><strong>30%</strong> on final delivery, deployment & go-live</li>
    `;

  const cleanTermsConditions = sanitizeTextContent(_optionalChain([quote, 'optionalAccess', _129 => _129.termsAndConditions]));
  const termsAndConditionsListHtml = (cleanTermsConditions && cleanTermsConditions.trim())
    ? cleanTermsConditions.split('\n').filter((l) => l.trim()).map((l) => `<li>${l}</li>`).join('')
    : `
      <li>Estimation is valid for 30 days from the date of this document.</li>
      <li>Timeline: Plan A &mdash; approx. 6&ndash;8 weeks; Plan B &mdash; approx. 10&ndash;12 weeks from kick-off, subject to timely client inputs.</li>
      <li>Cost excludes third-party charges such as payment gateway fees, SMS/email gateway costs, Apple Developer & Google Play publishing fees, and domain/hosting charges.</li>
      <li>Includes 30 days of complimentary post-launch bug-fix support. Ongoing maintenance available under a separate AMC.</li>
      <li>Any change in scope beyond the listed features will be estimated and billed separately.</li>
      <li>Source code and deployment credentials will be handed over upon full and final payment.</li>
    `;

  const rawInclusions = _optionalChain([quote, 'optionalAccess', _130 => _130.inclusions]) !== undefined ? quote.inclusions : _optionalChain([quote, 'optionalAccess', _131 => _131.scopeInclusions]);
  const cleanInclusions = rawInclusions !== undefined ? sanitizeTextContent(rawInclusions) : "";
  const inclusionsListHtml = (cleanInclusions && cleanInclusions.trim())
    ? cleanInclusions.split('\n').filter((l) => l.trim()).map((l) => `
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;">
        <span style="color: #16a34a; font-weight: 900; font-size: 10px;">&#10004;</span>
        <span>${l.replace(/^[-*•✔]\s*/, '')}</span>
      </li>
    `).join('')
    : `
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #16a34a; font-weight: 900; font-size: 10px;">&#10004;</span> Full source code and deployment credentials handover upon final settlement.</li>
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #16a34a; font-weight: 900; font-size: 10px;">&#10004;</span> Complimentary 30-day post-deployment bug-fix technical support.</li>
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #16a34a; font-weight: 900; font-size: 10px;">&#10004;</span> Production server deployment, SSL configuration & DNS domain mapping.</li>
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #16a34a; font-weight: 900; font-size: 10px;">&#10004;</span> Admin operator & merchant portal training session.</li>
    `;

  const rawExclusions = _optionalChain([quote, 'optionalAccess', _132 => _132.exclusions]) !== undefined ? quote.exclusions : _optionalChain([quote, 'optionalAccess', _133 => _133.scopeExclusions]);
  const cleanExclusions = rawExclusions !== undefined ? sanitizeTextContent(rawExclusions) : "";
  const exclusionsListHtml = (cleanExclusions && cleanExclusions.trim())
    ? cleanExclusions.split('\n').filter((l) => l.trim()).map((l) => `
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;">
        <span style="color: #dc2626; font-weight: 900; font-size: 10px;">&#10008;</span>
        <span>${l.replace(/^[-*•✖]\s*/, '')}</span>
      </li>
    `).join('')
    : `
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #dc2626; font-weight: 900; font-size: 10px;">&#10008;</span> Third-party API charges (SMS, WhatsApp API, Payment Gateway transaction fees).</li>
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #dc2626; font-weight: 900; font-size: 10px;">&#10008;</span> Google Play ($25) & Apple Developer ($99/year) console registration fees.</li>
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #dc2626; font-weight: 900; font-size: 10px;">&#10008;</span> Content copywriting, stock video/image purchasing, and brand graphic creation.</li>
      <li style="margin-bottom: 4px; display: flex; align-items: flex-start; gap: 6px;"><span style="color: #dc2626; font-weight: 900; font-size: 10px;">&#10008;</span> Additional feature additions beyond the agreed Section 3 scope matrix.</li>
    `;

  const renderRoleDescFormatted = (descRaw) => {
    if (!descRaw || !descRaw.trim()) return '';
    let items = descRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (items.length === 1) {
      const raw = items[0];
      if (raw.includes(",") || raw.includes(";") || raw.includes("•") || raw.includes("-")) {
        items = raw.split(/[,;•\n]|(?:\s+-\s+)/).map(s => s.trim()).filter(Boolean);
      }
    }
    if (items.length > 1) {
      return `
        <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 10px; color: #374151; line-height: 1.65; list-style-type: disc;">
          ${items.map(it => `<li style="margin-bottom: 3px;">${it}</li>`).join('')}
        </ul>
      `;
    }
    return `<p style="font-size: 10.5px; color: #374151; line-height: 1.5; margin: 4px 0 0 0;">${descRaw}</p>`;
  };

  const userRolesHtml = (_optionalChain([quote, 'optionalAccess', _134 => _134.userRoles]) && quote.userRoles.length > 0)
    ? quote.userRoles.map((r) => `
      <div style="background: rgba(252, 250, 255, 0.72); border: 1px solid #ddd6fe; border-left: 4px solid ${pdfPrimaryColor}; border-radius: 8px; padding: 12px 16px; width: 100%; box-sizing: border-box;">
        <h4 style="font-size: 13px; font-weight: 800; color: ${pdfPrimaryColor}; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">${r.title || r.roleName}</h4>
        ${renderRoleDescFormatted(r.description)}
      </div>
    `).join('')
    : `
      <div style="background: rgba(252, 250, 255, 0.72); border: 1px solid #ddd6fe; border-left: 4px solid ${pdfPrimaryColor}; border-radius: 8px; padding: 12px 16px; width: 100%; box-sizing: border-box;">
        <h4 style="font-size: 13px; font-weight: 800; color: ${pdfPrimaryColor}; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Customer</h4>
        ${renderRoleDescFormatted(customerDesc)}
      </div>
      <div style="background: rgba(252, 250, 255, 0.72); border: 1px solid #ddd6fe; border-left: 4px solid ${pdfPrimaryColor}; border-radius: 8px; padding: 12px 16px; width: 100%; box-sizing: border-box;">
        <h4 style="font-size: 13px; font-weight: 800; color: ${pdfPrimaryColor}; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Merchant</h4>
        ${renderRoleDescFormatted(merchantDesc)}
      </div>
      <div style="background: rgba(252, 250, 255, 0.72); border: 1px solid #ddd6fe; border-left: 4px solid ${pdfPrimaryColor}; border-radius: 8px; padding: 12px 16px; width: 100%; box-sizing: border-box;">
        <h4 style="font-size: 13px; font-weight: 800; color: ${pdfPrimaryColor}; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Admin</h4>
        ${renderRoleDescFormatted(adminDesc)}
      </div>
    `;

  const showPlanB = (_optionalChain([quote, 'optionalAccess', _135 => _135.includePlanB]) !== false && _optionalChain([quote, 'optionalAccess', _136 => _136.enablePlanB]) !== false);
  const bodyFont = _optionalChain([quote, 'optionalAccess', _137 => _137.companyFontFamily]) || _optionalChain([quote, 'optionalAccess', _138 => _138.pdfFontFamily]) || 'Poppins';
  const headingFont = _optionalChain([quote, 'optionalAccess', _139 => _139.companyHeadingFontFamily]) || _optionalChain([quote, 'optionalAccess', _140 => _140.companyHeadingFont]) || 'Times New Roman';

  const userRolesGridCols = (_optionalChain([quote, 'optionalAccess', _141 => _141.userRoles]) && quote.userRoles.length > 2) ? '1fr 1fr 1fr' : '1fr 1fr';
  const cleanPlanADisplayName = showPlanB 
    ? planAName 
    : (planAName.toLowerCase().includes("plan a") 
        ? (planAName.replace(/^PLAN\s*A\s*[—–-]?\s*/i, '').trim() || 'PROJECT INVESTMENT PACKAGE') 
        : planAName);
  const sec4Title = showPlanB ? '4. Investment Plans' : '4. Commercial Investment Plan';
  const sec4Subtitle = showPlanB ? 'Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.' : 'Proposed engagement model delivering the complete feature set listed in Section 3.';
  const sec4GridCols = showPlanB ? '1fr 1fr' : '1fr';
  const sec5Title = showPlanB ? '5. Plan Comparison' : '5. Deliverables Scope Coverage';
  const sec5PlanAHeader = showPlanB ? planAName : 'Included in Scope';
  const sec5PlanAWidth = showPlanB ? 'width: 140px;' : 'width: 180px;';

  const isWhiteFooter = (_optionalChain([quote, 'optionalAccess', _142 => _142.pdfFooterTheme]) || _optionalChain([quote, 'optionalAccess', _143 => _143.footerTheme])) === "white";
  const getFooterHtml = (pageNum) => {
    if (isWhiteFooter) {
      return `
        <div style="background: #ffffff; color: #1e293b; border-top: 2px solid ${pdfPrimaryColor}; padding: 14px 26px; font-size: 8.5px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
          <div><strong class="company-name-font" style="font-size: 9.5px; color: ${pdfPrimaryColor}; display: block; margin-bottom: 2px; font-weight: 800;">${footerName}</strong>${footerAddress}</div>
          <div style="text-align: right;"><strong style="font-size: 9.5px; color: ${pdfPrimaryColor}; display: block; margin-bottom: 2px; font-weight: 800;">Contact</strong>${footerContact} <span style="margin-left: 12px; color: #64748b; font-weight: 700;">Page ${pageNum} of 4</span></div>
        </div>
      `;
    }
    return `
      <div style="background: #0f172a; color: #ffffff; padding: 16px 26px; font-size: 8.5px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
        <div><strong class="company-name-font" style="font-size: 9.5px; color: #a7f3d0; display: block; margin-bottom: 2px;">${footerName}</strong>${footerAddress}</div>
        <div style="text-align: right;"><strong style="font-size: 9.5px; color: #a7f3d0; display: block; margin-bottom: 2px;">Contact</strong>${footerContact} <span style="margin-left: 12px; color: #94a3b8; font-weight: 700;">Page ${pageNum} of 4</span></div>
      </div>
    `;
  };

  return `
    <div style="font-family: '${bodyFont}', system-ui, -apple-system, sans-serif;">
      <style>
        html, body { margin: 0; padding: 12px 0; background: #0f172a; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 16px; min-height: 100vh; box-sizing: border-box; overflow-x: hidden !important; }
        * { 
          font-family: '${bodyFont}', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          -webkit-font-smoothing: antialiased !important; 
          -moz-osx-font-smoothing: grayscale !important; 
          text-rendering: optimizeLegibility !important;
          image-rendering: -webkit-optimize-contrast !important;
          letter-spacing: 0.012em !important;
          word-spacing: 0.06em !important;
          box-sizing: border-box; 
        }
        .pdf-page {
          font-family: '${bodyFont}', system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
          background: #ffffff;
          margin: 0 auto !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          border-radius: 6px;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: geometricPrecision !important;
          image-rendering: -webkit-optimize-contrast !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
          transform: scale(${activeZoom}) translateZ(0);
          transform-origin: top center;
          margin-bottom: ${activeZoom < 1 ? `-${Math.round(1115 * (1 - activeZoom))}px` : '0px'} !important;
        }
        .company-name-font { font-family: '${headingFont}', 'Times New Roman', Times, serif !important; }
        .investment-plan-font { font-family: '${headingFont}', 'Times New Roman', Times, serif !important; }
      </style>

      <!-- PAGE 1 -->
      <div class="pdf-page" style="width: 790px; height: 1115px; background: #ffffff; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        ${watermarkHtml}
        <div style="position: relative; z-index: 2;">
          <div style="background: linear-gradient(135deg, ${pdfPrimaryColor} 0%, ${pdfSecondaryColor} 100%); padding: 18px 26px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; gap: 18px;">
            <div style="display: flex; align-items: center; gap: 13px; min-width: 0; flex: 1; padding-right: 16px;">
              ${quoteLogoHtml}
              <div style="min-width: 0; flex: 1;">
                <div class="company-name-font" style="font-size: 21px; font-weight: 800; letter-spacing: 0; text-transform: uppercase; line-height: 1.15; word-spacing: 2px;">${compName}</div>
                <div style="font-size: 10px; opacity: 0.92; font-weight: 600; margin-top: 4px; line-height: 1.35; word-spacing: 2px;">${compTagline}</div>
              </div>
            </div>
            <div style="text-align: right; flex: 0 0 170px;">
              <div style="font-size: 15px; font-weight: 800; text-transform: uppercase;">PROJECT ESTIMATION</div>
              <div style="font-size: 10px; opacity: 0.9; font-family: monospace; font-weight: 700; margin-top: 2px;">Ref: ${docRef}</div>
              <div style="font-size: 10px; opacity: 0.85; margin-top: 1px;">Date: ${currentDate}</div>
            </div>
          </div>

          <div style="padding: 26px;">
            <h1 style="font-size: 22px; font-weight: 800; color: ${pdfPrimaryColor}; margin: 0 0 4px 0;">${docTitle}</h1>
            <div style="font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 22px;">Project Cost Estimation & Feature Scope Document</div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px 20px; background: rgba(252, 250, 255, 0.85); border: 1px solid #ede9fe; padding: 16px 18px; border-radius: 8px; margin-bottom: 24px;">
              <div><span style="font-size: 9px; font-weight: 700; color: ${pdfPrimaryColor}; text-transform: uppercase; display: block; margin-bottom: 2px;">Prepared For</span><strong style="font-size: 12px; color: #1e1b4b;">Client &mdash; ${clientName}</strong></div>
              <div><span style="font-size: 9px; font-weight: 700; color: ${pdfPrimaryColor}; text-transform: uppercase; display: block; margin-bottom: 2px;">Prepared By</span><strong class="company-name-font" style="font-size: 12px; color: #1e1b4b;">${compName}</strong></div>
              <div><span style="font-size: 9px; font-weight: 700; color: ${pdfPrimaryColor}; text-transform: uppercase; display: block; margin-bottom: 2px;">Project Type</span><strong style="font-size: 12px; color: #1e1b4b;">${projectType}</strong></div>
              <div><span style="font-size: 9px; font-weight: 700; color: ${pdfPrimaryColor}; text-transform: uppercase; display: block; margin-bottom: 2px;">Currency</span><strong style="font-size: 12px; color: #1e1b4b;">${currency}</strong></div>
              <div><span style="font-size: 9px; font-weight: 700; color: ${pdfPrimaryColor}; text-transform: uppercase; display: block; margin-bottom: 2px;">Validity</span><strong style="font-size: 12px; color: #1e1b4b;">30 Days from Date of Issue</strong></div>
            </div>

            <div style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 8px 14px; font-size: 13px; font-weight: 800; border-radius: 6px; margin-bottom: 12px; text-transform: uppercase;">1. Project Overview</div>
            <p style="font-size: 11px; line-height: 1.6; color: #374151; margin: 0 0 24px 0; background: rgba(250, 250, 250, 0.85); padding: 14px; border-radius: 8px; border-left: 4px solid ${pdfSecondaryColor};">${overviewText}</p>

            <div style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 8px 14px; font-size: 13px; font-weight: 800; border-radius: 6px; margin-bottom: 12px; text-transform: uppercase;">2. User Roles</div>
            <div style="display: grid; grid-template-columns: ${userRolesGridCols}; gap: 14px; align-items: stretch;">
              ${userRolesHtml}
            </div>
          </div>
        </div>

        ${getFooterHtml(1)}
      </div>

      <!-- PAGE 2 -->
      <div class="pdf-page" style="width: 790px; height: 1115px; background: #ffffff; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        ${watermarkHtml}
        <div style="position: relative; z-index: 2;">
          <div style="background: linear-gradient(135deg, ${pdfPrimaryColor} 0%, ${pdfSecondaryColor} 100%); padding: 14px 26px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; gap: 18px;">
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1;">
              ${quoteSmallLogoHtml}
              <span class="company-name-font" style="font-size: 16px; font-weight: 800; text-transform: uppercase; line-height: 1.2; word-spacing: 2px;">${compName}</span>
            </div>
            <div style="text-align: right; font-size: 11px; font-weight: 800; text-transform: uppercase; flex: 0 0 210px;">PROJECT ESTIMATION &bull; <span style="font-family: monospace;">${docRef}</span></div>
          </div>

          <div style="padding: 26px;">
            <div style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 8px 14px; font-size: 13px; font-weight: 800; border-radius: 6px; margin-bottom: 14px; text-transform: uppercase;">3. Complete Feature List &mdash; Included in Scope</div>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background: ${pdfPrimaryColor}; color: #ffffff;">
                  <th style="padding: 8px 10px; text-align: left; font-size: 10px; font-weight: 800; width: 25px;">#</th>
                  <th style="padding: 8px 10px; text-align: left; font-size: 10px; font-weight: 800; width: 160px;">Feature</th>
                  <th style="padding: 8px 10px; text-align: left; font-size: 10px; font-weight: 800;">Description</th>
                </tr>
              </thead>
              <tbody>
                ${featureRowsHtml}
              </tbody>
            </table>
          </div>
        </div>

        ${getFooterHtml(2)}
      </div>

      <!-- PAGE 3 -->
      <div class="pdf-page" style="width: 790px; height: 1115px; background: #ffffff; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        ${watermarkHtml}
        <div style="position: relative; z-index: 2;">
          <div style="background: linear-gradient(135deg, ${pdfPrimaryColor} 0%, ${pdfSecondaryColor} 100%); padding: 14px 26px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; gap: 18px;">
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1;">
              ${quoteSmallLogoHtml}
              <span class="company-name-font" style="font-size: 16px; font-weight: 800; text-transform: uppercase; line-height: 1.2; word-spacing: 2px;">${compName}</span>
            </div>
            <div style="text-align: right; font-size: 11px; font-weight: 800; text-transform: uppercase; flex: 0 0 210px;">PROJECT ESTIMATION &bull; <span style="font-family: monospace;">${docRef}</span></div>
          </div>

          <div style="padding: 26px;">
            <div class="investment-plan-font" style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 10px 16px; font-size: 14px; font-weight: 800; border-radius: 6px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${sec4Title}</div>
            <p style="font-size: 10px; color: #6b7280; margin-bottom: 12px;">${_optionalChain([quote, 'optionalAccess', _144 => _144.sec4Subtitle]) || sec4Subtitle}</p>
            <div style="display: grid; grid-template-columns: ${sec4GridCols}; gap: 16px; margin-bottom: 24px; align-items: stretch;">
              <div style="background: ${pdfPrimaryColor}; color: #ffffff; border-radius: 10px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div class="investment-plan-font" style="font-size: 13px; font-weight: 800; text-transform: uppercase; opacity: 0.95;">${cleanPlanADisplayName}</div>
                  <div class="investment-plan-font" style="font-size: 30px; font-weight: 900; margin: 8px 0 12px 0; color: #ffffff; display: flex; align-items: center; gap: 4px;">
                    <span style="font-family: Arial, sans-serif !important; font-size: 26px;">${currencySymbol}</span><span>${planAPrice.toLocaleString()}</span>
                  </div>
                  <ul style="font-size: 10px; line-height: 1.65; padding-left: 14px; margin: 0; opacity: 0.95;">
                    ${(() => {
                      const raw = _optionalChain([quote, 'optionalAccess', _145 => _145.planAHighlights]);
                      if (Array.isArray(raw) && raw.length > 0) return raw.map(it => `<li>${it}</li>`).join('');
                      if (typeof raw === "string" && raw.trim()) return raw.split('\n').filter((s) => s.trim()).map((it) => `<li>${it.trim()}</li>`).join('');
                      return `
                        <li>Responsive web application (Customer, Merchant & Admin portals)</li>
                        <li>All core features from Section 3</li>
                        <li>Secure payment gateway integration (Card / UPI)</li>
                        <li>QR-based ticket check-in (web scanner)</li>
                        <li>Admin & Merchant dashboards</li>
                        <li>Cross-browser, mobile-responsive UI</li>
                        <li>Basic SEO setup & deployment</li>
                        <li>Standard refresh-based updates without WebSocket live sync</li>
                      `;
                    })()}
                  </ul>
                </div>
              </div>

              ${showPlanB ? `
              <div style="background: linear-gradient(135deg, ${pdfPrimaryColor}, ${pdfSecondaryColor}); color: #ffffff; border-radius: 10px; padding: 18px; border: 2px solid #f59e0b; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);">
                <div style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); color: #000000; font-size: 8.5px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; text-align: center; padding: 5px 0; margin: -18px -18px 14px -18px; border-bottom: 1px solid #fef08a; font-family: 'Poppins', sans-serif !important;">
                  ${_optionalChain([quote, 'optionalAccess', _146 => _146.planBRibbonText]) || '★ RECOMMENDED CHOICE ★'}
                </div>
                <div>
                  <div class="investment-plan-font" style="font-size: 13px; font-weight: 800; text-transform: uppercase; opacity: 0.95;">${planBName}</div>
                  <div class="investment-plan-font" style="font-size: 30px; font-weight: 900; margin: 8px 0 12px 0; color: #ffffff; display: flex; align-items: center; gap: 4px;">
                    <span style="font-family: Arial, sans-serif !important; font-size: 26px;">${currencySymbol}</span><span>${planBPrice.toLocaleString()}</span>
                  </div>
                  <ul style="font-size: 10px; line-height: 1.65; padding-left: 14px; margin: 0; opacity: 0.95;">
                    ${(() => {
                      const raw = _optionalChain([quote, 'optionalAccess', _147 => _147.planBHighlights]);
                      if (Array.isArray(raw) && raw.length > 0) return raw.map(it => `<li>${it}</li>`).join('');
                      if (typeof raw === "string" && raw.trim()) return raw.split('\n').filter((s) => s.trim()).map((it) => `<li>${it.trim()}</li>`).join('');
                      return `
                        <li><strong>Everything in Plan A, plus:</strong></li>
                        <li>Real-time WebSocket updates for dashboards, project status, chat, and notifications</li>
                        <li>Live quotation, invoice, project, and todo sync without page refresh</li>
                        <li>Native/hybrid mobile apps for Customer & Merchant (Android + iOS)</li>
                        <li>Push notifications for promotions & alerts</li>
                        <li>In-app QR scanner for on-site check-in</li>
                        <li>Mobile-optimized chat & booking flow</li>
                        <li>App Store & Play Store submission support</li>
                      `;
                    })()}
                  </ul>
                </div>
              </div>
              ` : ''}
            </div>

            <div class="investment-plan-font" style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 10px 16px; font-size: 14px; font-weight: 800; border-radius: 6px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px;">${sec5Title}</div>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background: ${pdfPrimaryColor}; color: #ffffff;">
                  <th class="investment-plan-font" style="padding: 9px 12px; text-align: left; font-size: 11px; font-weight: 800;">Deliverable</th>
                  <th class="investment-plan-font" style="padding: 9px 12px; text-align: center; font-size: 11px; font-weight: 800; ${sec5PlanAWidth}">${sec5PlanAHeader}</th>
                  ${showPlanB ? `<th class="investment-plan-font" style="padding: 9px 12px; text-align: center; font-size: 11px; font-weight: 800; width: 140px;">${planBName}</th>` : ''}
                </tr>
              </thead>
              <tbody>
                ${((_optionalChain([quote, 'optionalAccess', _148 => _148.planComparisonItems]) && quote.planComparisonItems.length > 0) ? quote.planComparisonItems : [
                  { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
                  { deliverable: "All Core Marketplace Features", planA: true, planB: true },
                  { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
                  { deliverable: "QR Ticket Check-In", planA: true, planB: true },
                  { deliverable: "Real-time WebSocket live updates", planA: false, planB: true },
                  { deliverable: "Live project, quotation, invoice & todo sync", planA: false, planB: true },
                  { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
                  { deliverable: "Push Notifications", planA: false, planB: true },
                  { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
                ]).map((item, idx) => `
                  <tr style="border-bottom: 1px solid #f3f4f6; ${idx % 2 === 1 ? 'background: rgba(249, 250, 251, 0.85);' : 'background: rgba(255, 255, 255, 0.88);'}">
                    <td class="investment-plan-font" style="padding: 8px 10px; font-size: 11px; font-weight: 700;">${item.deliverable || item.title || item.name}</td>
                    <td style="padding: 8px 10px; text-align: center; color: ${item.planA !== false ? '#16a34a' : '#9ca3af'}; font-weight: 900;">${item.planA !== false ? '&#10004;' : '&mdash;'}</td>
                    ${showPlanB ? `<td style="padding: 8px 10px; text-align: center; color: ${item.planB !== false ? '#16a34a' : '#9ca3af'}; font-weight: 900;">${item.planB !== false ? '&#10004;' : '&mdash;'}</td>` : ''}
                  </tr>
                `).join('')}
                <tr style="background: rgba(245, 243, 255, 0.9); font-weight: 800;">
                  <td class="investment-plan-font" style="padding: 10px 12px; font-size: 12px; color: ${pdfPrimaryColor}; font-weight: 800;">Total Investment</td>
                  <td class="investment-plan-font" style="padding: 10px 12px; text-align: center; font-size: 12px; color: ${pdfSecondaryColor}; font-weight: 800;">${currencySymbol}${planAPrice.toLocaleString()}</td>
                  ${showPlanB ? `<td class="investment-plan-font" style="padding: 10px 12px; text-align: center; font-size: 12px; color: ${pdfSecondaryColor}; font-weight: 800;">${currencySymbol}${planBPrice.toLocaleString()}</td>` : ''}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        ${getFooterHtml(3)}
      </div>

      <!-- PAGE 4 -->
      <div class="pdf-page" style="width: 790px; height: 1115px; background: #ffffff; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        ${watermarkHtml}
        <div style="position: relative; z-index: 2;">
          <div style="background: linear-gradient(135deg, ${pdfPrimaryColor} 0%, ${pdfSecondaryColor} 100%); padding: 14px 26px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; gap: 18px;">
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1;">
              ${quoteSmallLogoHtml}
              <span class="company-name-font" style="font-size: 16px; font-weight: 800; text-transform: uppercase; line-height: 1.2; word-spacing: 2px;">${compName}</span>
            </div>
            <div style="text-align: right; font-size: 11px; font-weight: 800; text-transform: uppercase; flex: 0 0 210px;">PROJECT ESTIMATION &bull; <span style="font-family: monospace;">${docRef}</span></div>
          </div>

          <div style="padding: 26px;">
            <div style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 8px 14px; font-size: 13px; font-weight: 800; border-radius: 6px; margin-bottom: 14px; text-transform: uppercase;">6. Payment Terms</div>
            <ul style="font-size: 10px; line-height: 1.7; color: #374151; padding-left: 18px; margin: 0 0 28px 0;">
              ${paymentTermsListHtml}
            </ul>

            <div style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 8px 14px; font-size: 13px; font-weight: 800; border-radius: 6px; margin-bottom: 12px; text-transform: uppercase;">7. Terms & Conditions</div>
            <ul style="font-size: 9.5px; line-height: 1.5; color: #4b5563; padding-left: 18px; margin: 0 0 18px 0;">
              ${termsAndConditionsListHtml}
            </ul>

            <div style="background: ${pdfPrimaryColor}; color: #ffffff; padding: 8px 14px; font-size: 13px; font-weight: 800; border-radius: 6px; margin-bottom: 12px; text-transform: uppercase;">8. Scope Inclusions & Exclusions</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px;">
              <div style="background: rgba(240, 253, 244, 0.95); border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px;">
                <div style="font-size: 10px; font-weight: 900; color: #15803d; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">🟢 Project Scope Inclusions</div>
                <ul style="font-size: 9px; line-height: 1.5; color: #166534; padding-left: 0; list-style: none; margin: 0;">
                  ${inclusionsListHtml}
                </ul>
              </div>

              <div style="background: rgba(254, 242, 242, 0.95); border: 1px solid #fecaca; border-radius: 8px; padding: 12px;">
                <div style="font-size: 10px; font-weight: 900; color: #b91c1c; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">🔴 Project Scope Exclusions</div>
                <ul style="font-size: 9px; line-height: 1.5; color: #991b1b; padding-left: 0; list-style: none; margin: 0;">
                  ${exclusionsListHtml}
                </ul>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 24px; margin-bottom: 16px;">
              <div style="width: 42%;">
                <div style="font-size: 10px; font-weight: 700; color: #1e1b4b; margin-bottom: 40px;">For <strong class="company-name-font">${compName}</strong></div>
                <div style="border-bottom: 1px dashed #9ca3af; width: 100%;"></div>
                <div style="font-size: 9px; color: #6b7280; margin-top: 4px;">Authorized Signatory</div>
              </div>
              <div style="width: 42%;">
                <div style="font-size: 10px; font-weight: 700; color: #1e1b4b; margin-bottom: 40px;">For <strong>${clientName}</strong></div>
                <div style="border-bottom: 1px dashed #9ca3af; width: 100%;"></div>
                <div style="font-size: 9px; color: #6b7280; margin-top: 4px;">Client Signatory</div>
              </div>
            </div>
          </div>
        </div>

        ${getFooterHtml(4)}
      </div>
    </div>
  `;
};

export const generateSpeshwayAgreementPdfHtml = (agreement, proj, zoomScaleOverride) => {
  const activeZoom = zoomScaleOverride !== undefined ? zoomScaleOverride : (_optionalChain([agreement, 'optionalAccess', _149 => _149.zoomScale]) !== undefined ? agreement.zoomScale : 0.6);
  const agrNumber = _optionalChain([agreement, 'optionalAccess', _150 => _150.number]) || _optionalChain([agreement, 'optionalAccess', _151 => _151.id]) || `SPW-AGR-${Date.now().toString().slice(-4)}`;
  
  const rawDate = _optionalChain([agreement, 'optionalAccess', _152 => _152.date]) || _optionalChain([agreement, 'optionalAccess', _153 => _153.effectiveDate]) || new Date().toISOString().split("T")[0];
  let agrDateStr = "26 May, 2026";
  try {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleDateString('en-GB', { month: 'long' });
      const year = d.getFullYear();
      agrDateStr = `${month} ${day}, ${year}`;
    } else {
      agrDateStr = rawDate;
    }
  } catch (e3) {
    agrDateStr = rawDate;
  }

  const defaults = getGlobalCompanyDetails();
  const companyName = normalizePdfDisplayText(_optionalChain([agreement, 'optionalAccess', _154 => _154.billedByCompany]) || _optionalChain([agreement, 'optionalAccess', _155 => _155.companyName]) || defaults.billedByCompany, "SPESHWAY SOLUTIONS PVT LTD");
  const companyAddress = normalizePdfDisplayText(_optionalChain([agreement, 'optionalAccess', _156 => _156.companyAddress]) || _optionalChain([agreement, 'optionalAccess', _157 => _157.billedByAddress]) || defaults.companyAddress, "Plot No 1/C, Sy No 83/1, Raidurgam Knowledge City Rd, Serilingampalle, Telangana 500081");
  const companyEmail = _optionalChain([agreement, 'optionalAccess', _158 => _158.companyEmail]) || defaults.companyEmail || "info@speshway.com";
  const companyWebsite = _optionalChain([agreement, 'optionalAccess', _159 => _159.companyWebsite]) || defaults.companyWebsite || "www.speshway.com";
  const companyPhone = _optionalChain([agreement, 'optionalAccess', _160 => _160.companyPhone]) || defaults.companyPhone || "+91 91000 06020";

  const clientName = normalizePdfDisplayText(_optionalChain([agreement, 'optionalAccess', _161 => _161.clientName]) || _optionalChain([agreement, 'optionalAccess', _162 => _162.billedToClient]) || _optionalChain([proj, 'optionalAccess', _163 => _163.clientName]), "AMY SPORTS ARENA");
  const clientAddress = normalizePdfDisplayText(_optionalChain([agreement, 'optionalAccess', _164 => _164.clientAddress]) || "Kukatpally, Hyderabad Telangana");
  const projectName = normalizePdfDisplayText(_optionalChain([agreement, 'optionalAccess', _165 => _165.projectName]) || _optionalChain([agreement, 'optionalAccess', _166 => _166.billedToProduct]) || _optionalChain([proj, 'optionalAccess', _167 => _167.name]) || _optionalChain([agreement, 'optionalAccess', _168 => _168.title]), "Amy Sports Academy Platform");
  const duration = _optionalChain([agreement, 'optionalAccess', _169 => _169.duration]) || "one (1) month";
  
  const budget = Number(_optionalChain([agreement, 'optionalAccess', _170 => _170.rate]) || _optionalChain([agreement, 'optionalAccess', _171 => _171.amount]) || _optionalChain([agreement, 'optionalAccess', _172 => _172.budget]) || _optionalChain([proj, 'optionalAccess', _173 => _173.budget]) || 80000);
  
  const m1Pct = Number(_optionalChain([agreement, 'optionalAccess', _174 => _174.m1Pct]) !== undefined ? agreement.m1Pct : 40);
  const m2Pct = Number(_optionalChain([agreement, 'optionalAccess', _175 => _175.m2Pct]) !== undefined ? agreement.m2Pct : 40);
  const m3Pct = Number(_optionalChain([agreement, 'optionalAccess', _176 => _176.m3Pct]) !== undefined ? agreement.m3Pct : 20);

  const m1Amt = Math.round(budget * (m1Pct / 100));
  const m2Amt = Math.round(budget * (m2Pct / 100));
  const m3Amt = Math.round(budget * (m3Pct / 100));

  const primaryColor = _optionalChain([agreement, 'optionalAccess', _177 => _177.pdfPrimaryColor]) || defaults.pdfPrimaryColor || "#5D3ADF";
  const accentColor = _optionalChain([agreement, 'optionalAccess', _178 => _178.pdfSecondaryColor]) || defaults.pdfSecondaryColor || "#B8F7A1";
  const bodyFont = _optionalChain([agreement, 'optionalAccess', _179 => _179.pdfBodyFont]) || "Inter";
  const headingFont = _optionalChain([agreement, 'optionalAccess', _180 => _180.pdfHeadingFont]) || _optionalChain([agreement, 'optionalAccess', _181 => _181.pdfBodyFont]) || "Inter";

  let logoUrl = _optionalChain([agreement, 'optionalAccess', _182 => _182.companyLogoUrl]) !== undefined && agreement.companyLogoUrl !== "/logo.png" && agreement.companyLogoUrl !== "/logo.jpg" ? agreement.companyLogoUrl : (defaults.companyLogoUrl || "/pdf-logo.png");
  if (!logoUrl || logoUrl === "/logo.png" || logoUrl === "/logo.jpg" || logoUrl.endsWith("/logo.png") || logoUrl.endsWith("/logo.jpg")) {
    logoUrl = "/pdf-logo.png";
  }
  if (logoUrl && logoUrl.startsWith("/") && typeof window !== "undefined") {
    logoUrl = window.location.origin + logoUrl;
  }

  const logoHeight = Number(_optionalChain([agreement, 'optionalAccess', _183 => _183.companyLogoSize]) || _optionalChain([agreement, 'optionalAccess', _184 => _184.companyLogoHeight]) || 38);
  const logoOpacity = Number(_optionalChain([agreement, 'optionalAccess', _185 => _185.companyLogoOpacity]) !== undefined ? agreement.companyLogoOpacity : 1);
  const logoRotation = Number(_optionalChain([agreement, 'optionalAccess', _186 => _186.companyLogoRotation]) !== undefined ? agreement.companyLogoRotation : 0);

  // Watermark options
  const showWatermark = _optionalChain([agreement, 'optionalAccess', _187 => _187.showWatermark]) !== undefined ? Boolean(agreement.showWatermark) : true;
  let watermarkUrl = _optionalChain([agreement, 'optionalAccess', _188 => _188.companyWatermarkUrl]) !== undefined && agreement.companyWatermarkUrl !== "/logo.png" && agreement.companyWatermarkUrl !== "/logo.jpg" ? agreement.companyWatermarkUrl : (defaults.companyWatermarkUrl || "/pdf-logo.png");
  if (!watermarkUrl || watermarkUrl === "/logo.png" || watermarkUrl === "/logo.jpg" || watermarkUrl.endsWith("/logo.png") || watermarkUrl.endsWith("/logo.jpg")) {
    watermarkUrl = "/pdf-logo.png";
  }
  const watermarkText = _optionalChain([agreement, 'optionalAccess', _189 => _189.companyWatermarkText]) || defaults.companyWatermarkText || "SPESHWAY SOLUTIONS";
  const watermarkOpacity = _optionalChain([agreement, 'optionalAccess', _190 => _190.companyWatermarkOpacity]) !== undefined ? agreement.companyWatermarkOpacity : (_nullishCoalesce(defaults.companyWatermarkOpacity, () => ( 0.25)));
  const watermarkContrast = _optionalChain([agreement, 'optionalAccess', _191 => _191.companyWatermarkContrast]) !== undefined ? agreement.companyWatermarkContrast : (_nullishCoalesce(defaults.companyWatermarkContrast, () => ( 150)));
  const watermarkGrayscale = _optionalChain([agreement, 'optionalAccess', _192 => _192.companyWatermarkGrayscale]) !== undefined ? Boolean(agreement.companyWatermarkGrayscale) : false;
  const watermarkSize = _optionalChain([agreement, 'optionalAccess', _193 => _193.companyWatermarkSize]) !== undefined ? agreement.companyWatermarkSize : (_nullishCoalesce(defaults.companyWatermarkSize, () => ( 50)));
  const watermarkImgSize = _optionalChain([agreement, 'optionalAccess', _194 => _194.companyWatermarkImgSize]) !== undefined ? agreement.companyWatermarkImgSize : (_nullishCoalesce(defaults.companyWatermarkImgSize, () => ( 290)));
  const watermarkRotation = 0; // Fixed horizontal 0deg

  const watermarkHtml = (showWatermark && (watermarkUrl || watermarkText)) ? `
    <div class="watermark-bg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(${watermarkRotation}deg); opacity: ${watermarkOpacity}; pointer-events: none; z-index: 1; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;">
      ${watermarkUrl ? `<img src="${watermarkUrl}" alt="Watermark" style="max-width: ${watermarkImgSize}px; max-height: 240px; object-fit: contain; ${watermarkGrayscale ? 'filter: grayscale(100%);' : ''} filter: contrast(${watermarkContrast}%);" />` : ''}
      ${watermarkText ? `<div class="watermark-text" style="font-family: '${headingFont}', sans-serif; font-size: ${watermarkSize}px; font-weight: 900; color: ${primaryColor}; letter-spacing: 2.5px; text-transform: uppercase;">${watermarkText}</div>` : ''}
    </div>
  ` : '';

  const headerHtml = `
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${primaryColor}; padding-bottom: 12px; margin-bottom: 25px;">
      <div style="font-family: '${headingFont}', sans-serif; font-size: 18px; font-weight: 900; color: ${primaryColor}; letter-spacing: 0.5px;">${companyName.toUpperCase()}</div>
      <div>
        <img src="${logoUrl}" alt="Logo" style="height: ${logoHeight}px; opacity: ${logoOpacity}; transform: rotate(${logoRotation}deg); object-fit: contain; transition: all 0.2s ease-in-out;" />
      </div>
    </div>
  `;

  const footerHtml = `
    <div class="page-footer" style="text-align: center; border-top: 2px solid ${accentColor}; padding-top: 12px; font-size: 9px; color: #475569; line-height: 1.4; font-family: '${bodyFont}', sans-serif;">
      <div style="font-weight: 800; color: ${primaryColor}; text-transform: uppercase; margin-bottom: 2px;">${companyName}</div>
      <div>${companyAddress}</div>
      <div>Email: <a href="mailto:${companyEmail}" style="color: ${primaryColor}; text-decoration: none;">${companyEmail}</a> &nbsp;&bull;&nbsp; <a href="https://${companyWebsite}" target="_blank" style="color: ${primaryColor}; text-decoration: none;">${companyWebsite}</a></div>
    </div>
  `;

  // Dynamic Content Sections
  const docTitle = _optionalChain([agreement, 'optionalAccess', _195 => _195.docTitle]) || "Software Development Agreement";
  const introduction = _optionalChain([agreement, 'optionalAccess', _196 => _196.introduction]) || `This Software Development Agreement is entered into on <strong>${agrDateStr}</strong> (the "Effective Date"), by and between:
  <br/><br/>
  <strong>${companyName.toUpperCase()}</strong>, having its principal place of business at Hyderabad, India (hereinafter referred to as the "Company").
  <br/><br/>
  AND
  <br/><br/>
  <strong>${clientName.toUpperCase()}</strong>, having its principal place of business at ${clientAddress} (hereinafter referred to as the "Client").`;

  const sec1Title = _optionalChain([agreement, 'optionalAccess', _197 => _197.sec1Title]) || "1. Project Overview & Scope";
  const sec1Content = _optionalChain([agreement, 'optionalAccess', _198 => _198.sec1Content]) || "The Company agrees to design and develop a sports Management platform including a mobile application for users and a centralized web-based admin panel.";
  
  const sec1Subsection1Title = _optionalChain([agreement, 'optionalAccess', _199 => _199.sec1Subsection1Title]) || "1.1 User Mobile Application (Android & iOS)";
  const sec1Subsection1BulletText = _optionalChain([agreement, 'optionalAccess', _200 => _200.sec1Subsection1BulletText]) || `Authentication: Secure registration and login for academy members.
Slot Booking (External): Deep-linking functionality to open third-party apps (Playo or District) for slot bookings.
Team Matching: Feature to match users with other players/teams; mobile numbers are visible only to subscribed users.
Coupon Codes & Payments: Integration for applying coupons and a payment gateway for services.
Profile Management: User personal details and history.`;

  const sec1Subsection2Title = _optionalChain([agreement, 'optionalAccess', _201 => _201.sec1Subsection2Title]) || "1.2 Admin Web Panel";
  const sec1Subsection2BulletText = _optionalChain([agreement, 'optionalAccess', _202 => _202.sec1Subsection2BulletText]) || `Dashboard: Real-time overview of active bookings and user activity.
Slot & Capacity Management: Configuration of available hours and maximum members per session.
Subscription Management: Tools to manage memberships, tiers, and renewals.
Moderation: Management of users and overview of social sessions.`;

  const sec2Title = _optionalChain([agreement, 'optionalAccess', _203 => _203.sec2Title]) || "2. Project Duration";
  const sec2Content = _optionalChain([agreement, 'optionalAccess', _204 => _204.sec2Content]) || `The total estimated time for Phase 1 completion is <strong>${duration}</strong> from the Effective Date, subject to the timely provision of assets and approvals by the Client.`;

  const sec3Title = _optionalChain([agreement, 'optionalAccess', _205 => _205.sec3Title]) || "3. Financial Terms & Payment Schedule";
  const sec3Content = _optionalChain([agreement, 'optionalAccess', _206 => _206.sec3Content]) || `The total project cost is a fixed price of <strong>₹${budget.toLocaleString('en-IN')} (INR)</strong>.`;

  const sec4Title = _optionalChain([agreement, 'optionalAccess', _207 => _207.sec4Title]) || "4. Responsibilities";
  
  const sec4Subsection1Title = _optionalChain([agreement, 'optionalAccess', _208 => _208.sec4Subsection1Title]) || "4.1 Responsibilities of the Company";
  const sec4Subsection1BulletText = _optionalChain([agreement, 'optionalAccess', _209 => _209.sec4Subsection1BulletText]) || `Custom Development: End-to-end coding of the mobile application and administrative dashboard.
UI/UX Design: Professional interface design focused on sports usability.
Backend Engineering: Robust API development and database architecture.
Deployment Support: Assistance in hosting the admin panel and publishing to app stores.
Warranty: Inclusion of 3 months post-deployment technical support for bug fixes.`;

  const sec4Subsection2Title = _optionalChain([agreement, 'optionalAccess', _210 => _210.sec4Subsection2Title]) || "4.2 Responsibilities of the Client";
  const sec4Subsection2BulletText = _optionalChain([agreement, 'optionalAccess', _211 => _211.sec4Subsection2BulletText]) || `Assets & Media: Provision of high-resolution logos, images, and branding guidelines.
Third-Party Credentials: Provision of API keys for payment gateways, SMS services, and developer accounts (Google Play/Apple Store).
Timely Review: Feedback on design mockups and staging deployments within 48 hours to avoid timeline shifts.`;

  const sec5Title = _optionalChain([agreement, 'optionalAccess', _212 => _212.sec5Title]) || "5. Intellectual Property & Confidentiality";
  const sec5Subsection1Title = _optionalChain([agreement, 'optionalAccess', _213 => _213.sec5Subsection1Title]) || "5.1 Intellectual Property";
  const sec5Subsection1Content = _optionalChain([agreement, 'optionalAccess', _214 => _214.sec5Subsection1Content]) || 'Upon full and final payment of the total budget, the source code and assets specifically developed for this project shall be transferred to the Client. The Company retains the right to use underlying generic libraries and frameworks.';
  
  const sec5Subsection2Title = _optionalChain([agreement, 'optionalAccess', _215 => _215.sec5Subsection2Title]) || "5.2 Confidentiality";
  const sec5Subsection2Content = _optionalChain([agreement, 'optionalAccess', _216 => _216.sec5Subsection2Content]) || 'Both parties agree to protect and keep confidential any proprietary information, business data, or technical secrets disclosed during the project.';

  const sec6Title = _optionalChain([agreement, 'optionalAccess', _217 => _217.sec6Title]) || "6. Termination";
  const sec6Content = _optionalChain([agreement, 'optionalAccess', _218 => _218.sec6Content]) || 'Either party may terminate this Agreement with <strong>7 days</strong> written notice. In the event of termination, the Client shall pay for all work completed up to the termination date. If the Company terminates without cause, it shall return any unearned advance payments.';

  const sec7Title = _optionalChain([agreement, 'optionalAccess', _219 => _219.sec7Title]) || "7. Dispute Resolution";
  const sec7Content = _optionalChain([agreement, 'optionalAccess', _220 => _220.sec7Content]) || 'Any disputes arising out of this Agreement shall first be resolved through good-faith negotiations. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India.';

  const sec8Title = _optionalChain([agreement, 'optionalAccess', _221 => _221.sec8Title]) || "8. Force Majeure";
  const sec8Content = _optionalChain([agreement, 'optionalAccess', _222 => _222.sec8Content]) || 'Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including but not limited to natural disasters, government restrictions, or widespread internet outages.';

  const sec9Title = _optionalChain([agreement, 'optionalAccess', _223 => _223.sec9Title]) || "9. Amendments";
  const sec9Content = _optionalChain([agreement, 'optionalAccess', _224 => _224.sec9Content]) || 'Any changes to the scope of work (Scope Modifications) defined in Section 1 must be documented in a written "Change Request" and may be subject to additional billing and timeline extensions.';

  const sec10Title = _optionalChain([agreement, 'optionalAccess', _225 => _225.sec10Title]) || "10. Terms and Conditions";
  const sec10BulletText = _optionalChain([agreement, 'optionalAccess', _226 => _226.sec10BulletText]) || `Third-Party Fees: Costs for Play Store ($25), Apple Store ($99), and Cloud Hosting are not included in the 80k budget.
Content Entry: Uploading extensive historical marketing data is excluded.
Standard Tech Stack: Development will follow standard modern frameworks suitable for mobile and web.`;

  const renderBulletsHtml = (text) => {
    if (!text) return "";
    return text.split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        if (line.includes(":")) {
          const parts = line.split(":");
          const boldPart = parts[0].trim();
          const restPart = parts.slice(1).join(":").trim();
          return `<li><strong>${boldPart}:</strong> ${restPart}</li>`;
        }
        return `<li>${line}</li>`;
      })
      .join("\n");
  };

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Service Agreement - ${companyName} - ${clientName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important; 
    }
    body { 
      font-family: '${bodyFont}', -apple-system, BlinkMacSystemFont, sans-serif; 
      background: #f1f5f9; 
      color: #1e293b;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    }
    .pdf-container { 
      width: 800px; 
      background: #ffffff; 
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); 
      transform: scale(${activeZoom}); 
      transform-origin: top center; 
      margin-bottom: -150px;
    }
    .pdf-page { 
      position: relative; 
      width: 100%;
      height: 1120px; 
      padding: 45px 50px; 
      display: flex; 
      flex-direction: column; 
      justify-content: space-between; 
      overflow: hidden; 
      background: #ffffff;
      page-break-after: always;
    }
    
    .doc-title {
      font-family: '${headingFont}', sans-serif;
      font-size: 24px;
      font-weight: 900;
      color: ${primaryColor};
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: -0.5px;
    }
    
    .intro-text {
      font-size: 11px;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 20px;
    }
    
    .section-heading {
      font-family: '${headingFont}', sans-serif;
      font-size: 15px;
      font-weight: 800;
      color: ${primaryColor};
      margin-top: 24px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid ${accentColor};
      padding-bottom: 4px;
    }
    
    .subsection-heading {
      font-family: '${headingFont}', sans-serif;
      font-size: 12px;
      font-weight: 800;
      color: ${primaryColor};
      margin-top: 14px;
      margin-bottom: 8px;
    }
    
    .bullet-list {
      list-style-type: none;
      margin-left: 5px;
      margin-bottom: 14px;
    }
    .bullet-list li {
      position: relative;
      padding-left: 18px;
      font-size: 10.5px;
      line-height: 1.5;
      color: #334155;
      margin-bottom: 8px;
    }
    .bullet-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: -1px;
      color: ${primaryColor};
      font-size: 14px;
    }
    .bullet-list li strong {
      color: #0f172a;
    }
    
    .milestone-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 10.5px;
      border-radius: 8px;
      overflow: hidden;
    }
    .milestone-table th {
      background: ${primaryColor};
      color: #ffffff;
      font-weight: 800;
      text-align: left;
      padding: 10px 12px;
      border-bottom: 2px solid ${accentColor};
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.5px;
    }
    .milestone-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }
    .milestone-table tr:hover {
      background: #f8fafc;
    }
    
    .sign-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 40px;
    }
    .sign-box {
      vertical-align: top;
      width: 48%;
    }
    .sign-title {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 45px;
    }
    .sign-line {
      border-bottom: 1px solid #94a3b8;
      width: 80%;
      margin-bottom: 8px;
    }
    .sign-label {
      font-size: 10px;
      color: #64748b;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    
    <!-- PAGE 1 -->
    <div class="pdf-page">
      ${watermarkHtml}
      <div style="z-index: 2; position: relative;">
        ${headerHtml}
        
        <div class="doc-title">${docTitle}</div>
        
        <div class="intro-text">
          ${introduction}
        </div>
        
        <div class="section-heading">${sec1Title}</div>
        <div class="intro-text" style="margin-bottom: 12px;">
          ${sec1Content}
        </div>
        
        <div class="subsection-heading">${sec1Subsection1Title}</div>
        <ul class="bullet-list">
          ${renderBulletsHtml(sec1Subsection1BulletText)}
        </ul>
        
        <div class="subsection-heading">${sec1Subsection2Title}</div>
        <ul class="bullet-list">
          ${renderBulletsHtml(sec1Subsection2BulletText)}
        </ul>
      </div>
      ${footerHtml}
    </div>
    
    <!-- PAGE 2 -->
    <div class="pdf-page">
      ${watermarkHtml}
      <div style="z-index: 2; position: relative;">
        ${headerHtml}
        
        <div class="section-heading" style="margin-top: 0;">${sec2Title}</div>
        <div class="intro-text">
          ${sec2Content}
        </div>
        
        <div class="section-heading">${sec3Title}</div>
        <div class="intro-text" style="margin-bottom: 8px;">
          ${sec3Content}
        </div>
        
        <table class="milestone-table">
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Description</th>
              <th>Percentage</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Project Initiation</strong></td>
              <td>Upon signing of the agreement</td>
              <td>${m1Pct}%</td>
              <td><strong>₹${m1Amt.toLocaleString('en-IN')}</strong></td>
            </tr>
            <tr>
              <td><strong>Beta Delivery</strong></td>
              <td>Completion of mobile app and admin dashboard core modules</td>
              <td>${m2Pct}%</td>
              <td><strong>₹${m2Amt.toLocaleString('en-IN')}</strong></td>
            </tr>
            <tr>
              <td><strong>Deployment & Handover</strong></td>
              <td>Final launch on app stores and web hosting</td>
              <td>${m3Pct}%</td>
              <td><strong>₹${m3Amt.toLocaleString('en-IN')}</strong></td>
            </tr>
          </tbody>
        </table>
        
        <div class="section-heading" style="margin-top: 25px;">${sec4Title}</div>
        
        <div class="subsection-heading">${sec4Subsection1Title}</div>
        <ul class="bullet-list">
          ${renderBulletsHtml(sec4Subsection1BulletText)}
        </ul>
        
        <div class="subsection-heading">${sec4Subsection2Title}</div>
        <ul class="bullet-list" style="margin-bottom: 0;">
          ${renderBulletsHtml(sec4Subsection2BulletText)}
        </ul>
      </div>
      ${footerHtml}
    </div>
    
    <!-- PAGE 3 -->
    <div class="pdf-page">
      ${watermarkHtml}
      <div style="z-index: 2; position: relative;">
        ${headerHtml}
        
        <div class="section-heading" style="margin-top: 0;">${sec5Title}</div>
        
        <div class="subsection-heading">${sec5Subsection1Title}</div>
        <div class="intro-text">
          ${sec5Subsection1Content}
        </div>
        
        <div class="subsection-heading">${sec5Subsection2Title}</div>
        <div class="intro-text">
          ${sec5Subsection2Content}
        </div>
        
        <div class="section-heading">${sec6Title}</div>
        <div class="intro-text">
          ${sec6Content}
        </div>
        
        <div class="section-heading">${sec7Title}</div>
        <div class="intro-text">
          ${sec7Content}
        </div>
        
        <div class="section-heading">${sec8Title}</div>
        <div class="intro-text" style="margin-bottom: 0;">
          ${sec8Content}
        </div>
      </div>
      ${footerHtml}
    </div>
    
    <!-- PAGE 4 -->
    <div class="pdf-page">
      ${watermarkHtml}
      <div style="z-index: 2; position: relative;">
        ${headerHtml}
        
        <div class="section-heading" style="margin-top: 0;">${sec9Title}</div>
        <div class="intro-text">
          ${sec9Content}
        </div>
        
        <div class="section-heading">${sec10Title}</div>
        <ul class="bullet-list" style="margin-bottom: 30px;">
          ${renderBulletsHtml(sec10BulletText)}
        </ul>
        
        <div style="border-bottom: 1.5px solid #cbd5e1; margin-bottom: 35px; width: 100%;"></div>
        
        <table class="sign-table">
          <tr>
            <td class="sign-box">
              <div class="sign-title">For ${companyName}</div>
              <div class="sign-line"></div>
              <div class="sign-label">
                Signature: __________________________
                <br/>
                Name:
                <br/>
                Date:
              </div>
            </td>
            <td class="sign-box">
              <div class="sign-title">For ${clientName}</div>
              <div class="sign-line"></div>
              <div class="sign-label">
                Signature: __________________________
                <br/>
                Name:
                <br/>
                Date:
              </div>
            </td>
          </tr>
        </table>
      </div>
      ${footerHtml}
    </div>
    
  </div>
</body>
</html>`;
};

export const openPdfPrintPreview = (htmlBody) => {
  const win = window.open("", "_blank");
  if (win) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Document Preview & Print</title>
          <style>
            @media print {
              .no-print { display: none !important; }
              body { background: #ffffff !important; padding: 0 !important; margin: 0 !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background: #0f172a;">
          <div class="no-print" style="position: sticky; top: 0; z-index: 99999; display: flex; align-items: center; justify-content: space-between; background: #1e293b; color: #ffffff; padding: 12px 24px; border-bottom: 1px solid #334155; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
            <div style="font-weight: 700; font-size: 14px; font-family: sans-serif;">📄 Document Preview (Save as PDF / Print)</div>
            <div style="display: flex; gap: 10px;">
              <button onclick="window.print()" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 8px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px;">🖨️ Save as PDF / Print</button>
              <button onclick="window.close()" style="background: #334155; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">✕ Close</button>
            </div>
          </div>
          <div style="padding: 20px 0; display: flex; justify-content: center;">
            ${htmlBody}
          </div>
          <script>
            setTimeout(() => {
              window.print();
            }, 600);
          </script>
        </body>
      </html>
    `);
    win.document.close();
    return;
  }

  // FALLBACK: When popup window is blocked by browser, trigger direct iframe print bridge
  try {
    const printIframe = document.createElement("iframe");
    printIframe.style.position = "fixed";
    printIframe.style.right = "0px";
    printIframe.style.bottom = "0px";
    printIframe.style.width = "0px";
    printIframe.style.height = "0px";
    printIframe.style.border = "none";
    printIframe.style.zIndex = "-9999";
    document.body.appendChild(printIframe);

    const doc = _optionalChain([printIframe, 'access', _227 => _227.contentWindow, 'optionalAccess', _228 => _228.document]);
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Document</title>
            <style>
              @media print {
                body { background: #ffffff !important; padding: 0 !important; margin: 0 !important; }
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0;">
            ${htmlBody}
          </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        try {
          _optionalChain([printIframe, 'access', _229 => _229.contentWindow, 'optionalAccess', _230 => _230.focus, 'call', _231 => _231()]);
          _optionalChain([printIframe, 'access', _232 => _232.contentWindow, 'optionalAccess', _233 => _233.print, 'call', _234 => _234()]);
        } catch (err) {
          console.error("Print iframe failed:", err);
        }
        setTimeout(() => {
          if (document.body.contains(printIframe)) {
            document.body.removeChild(printIframe);
          }
        }, 5000);
      }, 500);
    }
  } catch (err) {
    console.error("Fallback print iframe failed:", err);
  }
};

export const triggerDirectPdfDownload = (htmlBody, fileName, compNameOverride) => {
  const company = compNameOverride || "Speshway_Solutions";
  const cleanCompany = company.replace(/[^a-zA-Z0-9\s_-]/g, " ").trim().replace(/\s+/g, "_");

  const formatCleanFileName = (rawName) => {
    if (!rawName) return `${cleanCompany}_Document.pdf`;
    let base = rawName.replace(/\.pdf$/i, "");
    base = base.replace(/^QT[-_][A-Z0-9]+[-_]?/gi, "");
    base = base.replace(/[^a-zA-Z0-9\s_-]/g, " ");
    base = base.trim().replace(/\s+/g, "_");
    
    if (!base.toLowerCase().startsWith(cleanCompany.toLowerCase())) {
      base = `${cleanCompany}_${base}`;
    }

    const lower = base.toLowerCase();
    if (!lower.includes("quotation") && !lower.includes("proposal") && !lower.includes("invoice") && !lower.includes("inv") && !lower.includes("estimation")) {
      base = `${base}_Document`;
    }

    return `${base}.pdf`;
  };

  const cleanFileName = formatCleanFileName(fileName);

  const waitForPdfImages = async (rootDoc) => {
    const images = Array.from(rootDoc.images || []);
    await Promise.all(images.map((img) => new Promise((resolve) => {
      if (img.complete && img.naturalWidth > 0) {
        resolve();
        return;
      }
      const done = () => resolve();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
      setTimeout(done, 2500);
    })));
  };

  const silentFileFallback = (content, name) => {
    try {
      const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${name}</title></head><body>${content}<script>window.onload=function(){window.print();};</script></body></html>`;
      const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = name.replace(/\.pdf$/i, ".html");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (e) {
      console.error("Silent file download fallback failed:", e);
    }
  };

  return ensurePdfScriptsLoaded().then(async () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.width = "850px";
    iframe.style.height = "1200px";
    iframe.style.border = "none";
    iframe.style.zIndex = "99999";
    iframe.style.opacity = "0.01";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || _optionalChain([iframe, 'access', _235 => _235.contentWindow, 'optionalAccess', _236 => _236.document]);
    if (!doc) {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      silentFileFallback(htmlBody, cleanFileName);
      openPdfPrintPreview(htmlBody);
      return;
    }

    const normalizedHtml = htmlBody.replace(/transform:\s*scale\([^)]+\);?/gi, "transform: none !important;");

    doc.open();
    doc.write(normalizedHtml);
    doc.close();

    if (doc.body) {
      doc.body.style.opacity = "1";
      doc.body.style.background = "#ffffff";
    }

    try {
      if (iframe.contentWindow && _optionalChain([(iframe.contentWindow ), 'access', _237 => _237.document, 'optionalAccess', _238 => _238.fonts])) {
        await (iframe.contentWindow ).document.fonts.ready;
      }
    } catch (e) {}

    await waitForPdfImages(doc);
    await new Promise(r => setTimeout(r, 250));

    try {
      const html2canvas = (window ).html2canvas;
      const jspdfModule = (window ).jspdf || (window ).jsPDF;
      const jsPDF = _optionalChain([jspdfModule, 'optionalAccess', _239 => _239.jsPDF]) || jspdfModule;

      if (!html2canvas || !jsPDF) {
        console.warn("PDF library missing, triggering Print Preview fallback & HTML download.");
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
        silentFileFallback(htmlBody, cleanFileName);
        openPdfPrintPreview(htmlBody);
        return;
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pageElements = doc.querySelectorAll(".pdf-page");

      if (pageElements.length > 0) {
        for (let i = 0; i < pageElements.length; i++) {
          const pageEl = pageElements[i] ;
          pageEl.style.transform = "none";
          (pageEl.style ).webkitTransform = "none";
          (pageEl.style ).zoom = "1";
          pageEl.style.opacity = "1";
          pageEl.style.background = "#ffffff";
          pageEl.style.color = "#0f172a";
          pageEl.style.margin = "0 auto";
          pageEl.style.marginBottom = "0px";

          const canvas = await html2canvas(pageEl, {
            scale: 2.5,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 800,
            imageTimeout: 0,
            window: iframe.contentWindow,
            document: doc
          });
          const imgData = canvas.toDataURL("image/jpeg", 0.98);
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
        }
      } else {
        const targetEl = (doc.querySelector(".pdf-page") || doc.body) ;
        const canvas = await html2canvas(targetEl, {
          scale: 2.5,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 800,
          imageTimeout: 0,
          window: iframe.contentWindow,
          document: doc
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.98);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, Math.min(pdfHeight, 297), undefined, "FAST");
      }

      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const downloadLink = document.createElement("a");
      downloadLink.style.display = "none";
      downloadLink.href = blobUrl;
      downloadLink.download = cleanFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    } catch (err) {
      console.error("PDF file generation failed, triggering fallback download:", err);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      silentFileFallback(htmlBody, cleanFileName);
      openPdfPrintPreview(htmlBody);
    }
  }).catch((err) => {
    console.error("Failed to load PDF export library, triggering fallback download:", err);
    silentFileFallback(htmlBody, cleanFileName);
    openPdfPrintPreview(htmlBody);
  });
};

const ensurePdfScriptsLoaded = () => {
  const checkLoaded = () => Boolean((window ).html2canvas && ((window ).jspdf || (window ).jsPDF));
  if (checkLoaded()) return Promise.resolve();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const existing = document.querySelector(`script[src="${src}"]`) ;
      if (existing && checkLoaded()) {
        resolve();
        return;
      }
      const s = existing || document.createElement("script");
      if (!existing) {
        s.src = src;
        s.async = true;
        s.crossOrigin = "anonymous";
        document.head.appendChild(s);
      }

      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (checkLoaded() || count > 30) {
          clearInterval(interval);
          resolve();
        }
      }, 100);

      s.onload = () => { clearInterval(interval); resolve(); };
      s.onerror = () => { clearInterval(interval); resolve(); };
    });
  };

  return loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js")
    .then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"))
    .then(() => {
      if (!checkLoaded()) {
        return loadScript("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js")
          .then(() => loadScript("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"));
      }
    })
    .then(() => {
      if (!checkLoaded()) {
        return loadScript("https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js")
          .then(() => loadScript("https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"));
      }
    });
};

export const generatePdfDataUri = (htmlBody) => {
  return ensurePdfScriptsLoaded().then(async () => {
    const waitForPdfImages = async (rootDoc) => {
      const images = Array.from(rootDoc.images || []);
      await Promise.all(images.map((img) => new Promise((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          resolve();
          return;
        }
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
        setTimeout(done, 2500);
      })));
    };

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.width = "850px";
    iframe.style.height = "1200px";
    iframe.style.border = "none";
    iframe.style.zIndex = "-9999";
    iframe.style.opacity = "1";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || _optionalChain([iframe, 'access', _240 => _240.contentWindow, 'optionalAccess', _241 => _241.document]);
    if (!doc) {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      return "";
    }

    const normalizedHtml = htmlBody.replace(/transform:\s*scale\([^)]+\);?/gi, "transform: none !important;");

    doc.open();
    doc.write(normalizedHtml);
    doc.close();

    if (doc.body) {
      doc.body.style.opacity = "1";
      doc.body.style.background = "#ffffff";
    }

    try {
      if (iframe.contentWindow && _optionalChain([(iframe.contentWindow ), 'access', _242 => _242.document, 'optionalAccess', _243 => _243.fonts])) {
        await (iframe.contentWindow ).document.fonts.ready;
      }
    } catch (e) {}

    await waitForPdfImages(doc);
    await new Promise(r => setTimeout(r, 250));

    try {
      const html2canvas = (window ).html2canvas;
      const jspdfModule = (window ).jspdf || (window ).jsPDF;
      const jsPDF = _optionalChain([jspdfModule, 'optionalAccess', _244 => _244.jsPDF]) || jspdfModule;

      if (!html2canvas || !jsPDF) {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
        return "";
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pageElements = doc.querySelectorAll(".pdf-page");

      if (pageElements.length > 0) {
        for (let i = 0; i < pageElements.length; i++) {
          const pageEl = pageElements[i] ;
          pageEl.style.transform = "none";
          (pageEl.style ).webkitTransform = "none";
          (pageEl.style ).zoom = "1";
          pageEl.style.opacity = "1";
          pageEl.style.background = "#ffffff";
          pageEl.style.color = "#0f172a";
          pageEl.style.margin = "0 auto";
          pageEl.style.marginBottom = "0px";

          const canvas = await html2canvas(pageEl, {
            scale: 2.0,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 800,
            imageTimeout: 0,
            window: iframe.contentWindow,
            document: doc
          });
          const imgData = canvas.toDataURL("image/jpeg", 0.92);
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
        }
      } else {
        const targetEl = (doc.querySelector(".pdf-page") || doc.body) ;
        const canvas = await html2canvas(targetEl, {
          scale: 2.0,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 800,
          imageTimeout: 0,
          window: iframe.contentWindow,
          document: doc
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, Math.min(pdfHeight, 297), undefined, "FAST");
      }

      const dataUri = pdf.output("datauristring");
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      return dataUri;
    } catch (err) {
      console.error("Failed to generate PDF data URI:", err);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      return "";
    }
  });
};

