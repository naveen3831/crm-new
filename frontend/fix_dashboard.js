const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/admin/dashboard/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const brokenSnippet = `  let activeQuoteForDetail: Quotation | any = null;
  if (activeProjectDetail) {
    const found = quotations.find(q => 
      q.projectId === activeProjectDetail.id || 
              handleSaveQuotationSection={handleSaveQuotationSection}
            />
          </Suspense>`;

const fixedSnippet = `  let activeQuoteForDetail: Quotation | any = null;
  if (activeProjectDetail) {
    const found = quotations.find(q => 
      q.projectId === activeProjectDetail.id || 
      q.projectName === activeProjectDetail.name || 
      (q.title && activeProjectDetail.name && q.title.toLowerCase().includes(activeProjectDetail.name.toLowerCase())) ||
      q.clientName === activeProjectDetail.clientName
    );
    if (found) {
      activeQuoteForDetail = found;
    } else {
      activeQuoteForDetail = {
        id: \`QT-\${activeProjectDetail.id || "0001"}\`,
        number: \`QT-\${activeProjectDetail.id || "0001"}\`,
        projectId: activeProjectDetail.id,
        title: \`\${activeProjectDetail.name} Custom Estimation Proposal\`,
        clientName: activeProjectDetail.clientName || "Enterprise Client",
        projectName: activeProjectDetail.name,
        planAPrice: 50000,
        planBPrice: 65000,
        currency: "Indian Rupees (INR)",
        planComparisonItems: defaultPlanComparisonDeliverables,
        overviewNarrative: activeProjectDetail.description || "",
        customerDesc: "Customer portal & cart checkout.",
        merchantDesc: "Merchant portal & booking management.",
        adminDesc: "Admin panel & ecosystem governance.",
        paymentTerms: "40% advance on project kick-off\\n30% on completion of core module\\n30% on final delivery",
        termsAndConditions: "Estimation valid for 30 days.\\nIncludes 30 days complimentary bug-fix support.\\nSource code handed over upon full payment.",
        status: "Approved"
      };
    }
  }

  const activeCompItems = activeQuoteForDetail ? getCleanPlanComparisonItems(activeQuoteForDetail.planComparisonItems) : [];
  const activeQuote = activeQuoteForDetail;

  // Derived state for reviewing quote modal
  const reviewCompItems = reviewingQuote ? getCleanPlanComparisonItems(reviewingQuote.planComparisonItems || defaultPlanComparisonDeliverables) : [];
  let reviewFeatures: any[] = [];
  if (reviewingQuote) {
    reviewFeatures = features.filter(f => 
      f.projectId === reviewingQuote.projectId || 
      f.projectId === activeProjectDetail?.id || 
      f.projectName === reviewingQuote.projectName || 
      f.projectName === activeProjectDetail?.name
    );
  }
  const reviewPdfHtmlContent = reviewingQuote ? generateSpeshwayEstimationPdfHtml(activeProjectDetail, reviewingQuote, reviewFeatures) : "";
  const pdfHtmlContent = reviewPdfHtmlContent;

  // Check if current view should hide the main CRM sidebar
  const hideSidebar = Boolean(
    activeProjectDetail ||
    (activeProjectProposalsView && activeTab === "our-projects")
  );

  // 3. Render Main CRM Admin Dashboard
  return (
    <div className="min-h-screen workspace-aurora flex flex-col md:flex-row font-sans">
      {!hideSidebar && (
        <aside className="w-full md:w-72 md:h-screen md:sticky md:top-0 sidebar-premium text-gray-700 flex flex-col shrink-0 px-5 py-4 shadow-sm border-r relative overflow-hidden">
          <div className="flex flex-col gap-4 min-h-0 flex-1">
            {/* Brand Logo and icon */}
            <div className="border-b border-gray-150 pb-3 min-w-0">
              <CrmBrandLogo size="sm" />
            </div>

            {/* Hierarchical Sidebar Lists */}
            <div className="flex flex-col gap-3 min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1">
              {sidebarCategories.map((category) => (
                <div key={category.title} className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider pl-3 leading-none">
                    {category.title}
                  </span>
                  <nav className="flex flex-col gap-0.5">
                    {category.links.map((link) => {
                      const isActive = activeTab === link.id;
                      return (
                        <div key={link.id} className="relative">
                          <button
                            onClick={() => {
                              setActiveTab(link.id);
                              setActiveClientDetail(null);
                              setActiveProjectDetail(null);
                              setActiveProjectProposalsView(null);
                              setSelectedClientProjectId(null);
                            }}
                            className={\`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-[13px] leading-5 font-semibold transition-all duration-200 ease-out interactive-lift overflow-hidden [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0 \${
                              isActive
                                ? "premium-button text-white shadow-md shadow-teal-700/20"
                                : "text-gray-600 hover:text-[#071E34] hover:bg-teal-50"
                            }\`}
                          >
                            {link.icon}
                            <span className="truncate">{link.name}</span>
                          </button>
                          {isActive && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#0E9F8A] rounded-l-md shadow-[0_0_14px_rgba(14,159,138,0.45)]" />
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Footer info logout */}
            <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-gray-150 shrink-0 bg-white/95">
              <div className="flex items-center gap-2 px-2 min-w-0">
                <div className="w-7 h-7 rounded-full premium-button flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                  AD
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#071E34] leading-none">Admin Operator</div>
                  <div className="text-[9px] text-gray-400 mt-1 truncate">Super Admin Account</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-1.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors overflow-hidden"
              >
                <LogOut size={15} className="shrink-0" />
                <span className="truncate">Log Out Workspace</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. MAIN WORKSPACE CONTENT CONTAINER */}
      <main className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto animate-page-enter">
        <input 
          type="file" 
          ref={quoteFileInputRef} 
          accept=".txt,.json,.csv,.doc,.docx,.pdf" 
          onChange={handleQuoteFileUpload} 
          className="hidden" 
        />
        {activeProjectDetail ? (
          <Suspense fallback={<div className="p-12 text-center text-xs font-semibold text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse">Loading project details workspace...</div>}>
            <ProjectDetailModal
              activeProjectDetail={activeProjectDetail}
              setActiveProjectDetail={setActiveProjectDetail}
              activeProjectTab={activeProjectTab}
              setActiveProjectTab={setActiveProjectTab}
              quotations={quotations}
              setQuotations={setQuotations}
              features={features}
              setFeatures={setFeatures}
              setReviewingQuote={setReviewingQuote}
              API_URL={API_URL}
              loadDatabase={loadDatabase}
              defaultPlanComparisonDeliverables={defaultPlanComparisonDeliverables}
              getCleanPlanComparisonItems={getCleanPlanComparisonItems}
              generateSpeshwayEstimationPdfHtml={generateSpeshwayEstimationPdfHtml}
              triggerDirectPdfDownload={triggerDirectPdfDownload}
              universalSectionFileInputRef={universalSectionFileInputRef}
              activeSectionToUpload={activeSectionToUpload}
              setActiveSectionToUpload={setActiveSectionToUpload}
              handleUniversalSectionFileUpload={handleUniversalSectionFileUpload}
              handleSaveQuotationSection={handleSaveQuotationSection}
            />
          </Suspense>`;

if (content.includes(brokenSnippet)) {
  content = content.replace(brokenSnippet, fixedSnippet);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully fixed dashboard page!');
} else {
  console.error('Broken snippet not found precisely. Please inspect content.');
}
