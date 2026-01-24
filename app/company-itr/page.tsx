// "use client";
// import { useState } from "react";
// import { 
//   Briefcase, 
//   TrendingUp, 
//   Home, 
//   PlusCircle, 
//   ChevronLeft,
//   RefreshCcw,
//   CheckCircle2,
//   UploadCloud
// } from "lucide-react";

// export default function CompanyITRPage() {
//   const [step, setStep] = useState(1);
//   const [selectedSource, setSelectedSource] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSourceSelect = (source: string) => {
//     setSelectedSource(source);
//     setIsProcessing(true);
    
//     setTimeout(() => {
//       setIsProcessing(false);
//       setStep(5);
//     }, 2000);
//   };

//   const getITR = (source: string) => {
//     if (source === "Business") return "ITR-4";
//     if (source === "Capital Gains" || source === "House Property") return "ITR-2";
//     return "ITR-6";
//   };

//   const sourceOptions = [
//     { id: "Business", label: "Business", icon: <Briefcase size={28} /> },
//     { id: "Capital Gains", label: "Capital Gains", icon: <TrendingUp size={28} /> },
//     { id: "House Property", label: "House Property", icon: <Home size={28} /> },
//     { id: "Other Sources", label: "Other Sources", icon: <PlusCircle size={28} /> },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
//       <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-50
//         flex flex-col items-center justify-center min-h-[550px]">

//         {/* ================= PROCESSING ================= */}
//         {isProcessing ? (
//           <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in duration-500">
//             <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878]
//               flex items-center justify-center mb-6 relative">
//               <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
//               <div className="absolute -top-2 -right-2 text-yellow-400">✦</div>
//               <div className="absolute -bottom-2 -left-2 text-yellow-400">✦</div>
//             </div>
//             <p className="text-[#00a878] font-bold text-xl">
//               Processing your answers...
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* ================= STEP 1 ================= */}
//             {step === 1 && (
//               <QuestionUI
//                 title="Company Assessment"
//                 question="What is the residential status of the company?"
//                 options={["Resident", "Non-Resident"]}
//                 onNext={() => setStep(2)}
//               />
//             )}

//             {/* ================= STEP 2 ================= */}
//             {step === 2 && (
//               <QuestionUI
//                 title="Director Details"
//                 question="Is any director a non-resident or foreign director?"
//                 options={["Yes", "No"]}
//                 onNext={() => setStep(3)}
//                 onPrev={() => setStep(1)}
//               />
//             )}

//             {/* ================= STEP 3 ================= */}
//             {step === 3 && (
//               <QuestionUI
//                 title="Shareholding"
//                 question="Does the company hold unlisted equity shares?"
//                 options={["Yes", "No"]}
//                 onNext={() => setStep(4)}
//                 onPrev={() => setStep(2)}
//               />
//             )}

//             {/* ================= STEP 4 ================= */}
//             {step === 4 && (
//               <div className="text-center py-20 flex flex-col items-center animate-in fade-in">
//                 <h2 className="text-[32px] font-bold text-[#4e557d] mb-6">
//                   Select Income Source
//                 </h2>
//                 <p className="text-slate-500 mb-20 text-lg max-w-xl">
//                   Choose the primary source of income for the company
//                 </p>
                
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 w-full max-w-3xl">
//                   {sourceOptions.map((src) => (
//                     <button 
//                       key={src.id}
//                       onClick={() => handleSourceSelect(src.id)}
//                       className="flex flex-col items-center justify-center p-10 border-2 border-slate-100 
//                         rounded-[2rem] transition-all duration-300 hover:border-[#00a878] hover:bg-[#f0fdfa]"
//                     >
//                       <div className="mb-6 p-4 rounded-2xl bg-slate-50 text-slate-400
//                         hover:bg-[#00a878] hover:text-white transition">
//                         {src.icon}
//                       </div>
//                       <span className="font-bold text-sm uppercase tracking-wide text-slate-500">
//                         {src.label}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setStep(3)}
//                   className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600"
//                 >
//                   <ChevronLeft size={20} /> Back
//                 </button>
//               </div>
//             )}

//             {/* ================= STEP 5 ================= */}
//             {step === 5 && (
//               <div className="text-center py-24 flex flex-col items-center animate-in zoom-in-95 duration-500">
//                 <CheckCircle2 size={56} className="text-[#00a878] mb-6" />

//                 <h2 className="text-2xl font-bold text-slate-700 mb-4">
//                   Based on your answers, the correct ITR form is:
//                 </h2>

//                 <div className="text-6xl font-black text-[#00a878] mb-10">
//                   {getITR(selectedSource)}
//                 </div>

//                 <p className="text-slate-500 max-w-md mb-16 leading-relaxed text-lg">
//                   Upload your documents and relax — our tax experts will take it from here.
//                 </p>
                
//                 <div className="flex flex-col items-center gap-14">
//                   <button className="flex flex-col items-center gap-3 group">
//                     <div className="w-24 h-24 rounded-full bg-[#e6f7f1] flex items-center justify-center 
//                       text-[#00a878] group-hover:scale-110 transition-transform shadow-md 
//                       border border-[#00a878]/20">
//                       <UploadCloud size={40} />
//                     </div>
//                     <span className="font-bold text-slate-600 text-lg">
//                       Upload Company Documents
//                     </span>
//                   </button>

//                   <button 
//                     onClick={() => { setStep(1); setSelectedSource(""); }} 
//                     className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold 
//                       hover:bg-[#00966a] transition-all"
//                   >
//                     Start New Assessment
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =======================
//    Reusable Question UI
// ======================= */

// function QuestionUI({ title, question, options, onNext, onPrev }: any) {
//   return (
//     <div className="flex justify-center animate-in fade-in">
//       <div className="w-full max-w-3xl">

//         <h2 className="text-[32px] font-bold text-[#4e557d] mb-10 text-center">
//           {title}
//         </h2>

//         <p className="text-black font-bold text-xl mb-20 text-center">
//           {question}
//         </p>

//         <div className="space-y-10 mb-20">
//           {options.map((opt: string) => (
//             <label 
//               key={opt}
//               className="flex items-center p-8 border-2 border-slate-100 rounded-2xl cursor-pointer
//                 transition-all hover:border-[#00a878] hover:bg-[#f0fdfa]"
//             >
//               <input 
//                 type="radio" 
//                 name="q" 
//                 className="w-6 h-6 accent-[#00a878] mr-6" 
//               />
//               <span className="text-slate-600 font-bold text-lg">
//                 {opt}
//               </span>
//             </label>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mt-10">
//           {onPrev ? (
//             <button 
//               onClick={onPrev} 
//               className="flex items-center gap-1 text-slate-400 font-bold hover:text-slate-600"
//             >
//               <ChevronLeft size={20}/> Back
//             </button>
//           ) : <div />}

//           <button 
//             onClick={onNext} 
//             className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold 
//               hover:bg-[#00966a] transition-all"
//           >
//             Next Step
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


// // "use client";
// // import { useState } from "react";
// // import { 
// //   Briefcase, 
// //   TrendingUp, 
// //   Home, 
// //   PlusCircle, 
// //   ChevronLeft,
// //   RefreshCcw,
// //   CheckCircle2,
// //   UploadCloud
// // } from "lucide-react";

// // export default function CompanyITRPage() {
// //   const [step, setStep] = useState(1);
// //   const [selectedSource, setSelectedSource] = useState("");
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   // Function to determine ITR and trigger the processing animation
// //   const handleSourceSelect = (source: string) => {
// //     setSelectedSource(source);
// //     setIsProcessing(true);
    
// //     // Simulate the processing delay from your screenshot
// //     setTimeout(() => {
// //       setIsProcessing(false);
// //       setStep(5); // Move to final result step
// //     }, 2000);
// //   };

// //   const getITR = (source: string) => {
// //     if (source === "Business") return "ITR-4";
// //     if (source === "Capital Gains" || source === "House Property") return "ITR-2";
// //     return "ITR-6";
// //   };

// //   const sourceOptions = [
// //     { id: "Business", label: "Business", icon: <Briefcase size={28} /> },
// //     { id: "Capital Gains", label: "Capital Gains", icon: <TrendingUp size={28} /> },
// //     { id: "House Property", label: "House Property", icon: <Home size={28} /> },
// //     { id: "Other Sources", label: "Other Sources", icon: <PlusCircle size={28} /> },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
// //       <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-50 relative overflow-hidden">
        
// //         {/* PROCESSING STATE (Matching image_269e6d.png) */}
// //         {isProcessing ? (
// //           <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
// //             <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878] flex items-center justify-center mb-6 relative">
// //                <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
// //                {/* Decorative sparkles to match the UI */}
// //                <div className="absolute -top-2 -right-2 text-yellow-400">✦</div>
// //                <div className="absolute -bottom-2 -left-2 text-yellow-400">✦</div>
// //             </div>
// //             <p className="text-[#00a878] font-bold text-xl tracking-tight">Processing your answers...</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Steps 1-3 */}
// //             {step === 1 && <QuestionUI title="Step 1" question="Residential Status?" options={["Resident", "Non-Resident"]} onNext={() => setStep(2)} />}
// //             {step === 2 && <QuestionUI title="Step 2" question="Director Status?" options={["Yes", "No"]} onNext={() => setStep(3)} onPrev={() => setStep(1)} />}
// //             {step === 3 && <QuestionUI title="Step 3" question="Unlisted Shares?" options={["Yes", "No"]} onNext={() => setStep(4)} onPrev={() => setStep(2)} />}

// //             {/* STEP 4: INCOME SOURCE */}
// //             {step === 4 && (
// //               <div className="text-center animate-in fade-in duration-500">
// //                 <h2 className="text-[32px] font-bold mb-2 text-[#4e557d]">Select Income Source</h2>
// //                 <p className="text-slate-500 mb-10 text-lg">Choose the primary source of income for the company</p>
                
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
// //                   {sourceOptions.map((src) => (
// //                     <button 
// //                       key={src.id}
// //                       onClick={() => handleSourceSelect(src.id)}
// //                       className="flex flex-col items-center justify-center p-8 border-2 border-slate-100 rounded-[2rem] transition-all duration-300 hover:border-[#00a878] hover:bg-[#f0fdfa] group"
// //                     >
// //                       <div className="mb-4 p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#00a878] group-hover:text-white transition-colors">
// //                         {src.icon}
// //                       </div>
// //                       <span className="font-bold text-sm uppercase tracking-wider text-slate-500 group-hover:text-[#00a878]">{src.label}</span>
// //                     </button>
// //                   ))}
// //                 </div>

// //                 <div className="flex justify-start mt-6">
// //                   <button onClick={() => setStep(3)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
// //                     <ChevronLeft size={20} /> Previous Step
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 5: FINAL RESULT (Matching image_32073e.png) */}
// //             {step === 5 && (
// //               <div className="text-center animate-in zoom-in-95 duration-500">
// //                 <div className="flex justify-center mb-6">
// //                   <CheckCircle2 size={50} className="text-[#00a878]" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-slate-700 mb-2">Thanks! Based on your answers, here's the right ITR form for you:</h2>
// //                 <div className="text-8xl font-black text-[#00a878] mb-8">{getITR(selectedSource)}</div>
// //                 <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed text-lg">
// //                   For that, please upload your documents. Our tax experts are here why fear when we're near? Just relax, we've got this!
// //                 </p>
                
// //                 <div className="flex flex-col items-center gap-8">
// //                   <button className="flex flex-col items-center gap-3 group">
// //                     <div className="w-20 h-20 rounded-full bg-[#e6f7f1] flex items-center justify-center text-[#00a878] group-hover:scale-110 transition-transform shadow-sm border border-[#00a878]/20">
// //                       <UploadCloud size={32} />
// //                     </div>
// //                     <span className="font-bold text-slate-600">Upload Your ITR Docs</span>
// //                   </button>
                  
// //                   <button 
// //                     onClick={() => { setStep(1); setSelectedSource(""); }} 
// //                     className="bg-[#00a878] text-white px-12 py-4 rounded-xl font-bold hover:bg-[#00966a] transition-all shadow-lg"
// //                   >
// //                     Start New Assessment
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // Reusable Question Component
// // function QuestionUI({ title, question, options, onNext, onPrev }: any) {
// //   return (
// //     <div className="animate-in slide-in-from-right-5 duration-300">
// //       <h2 className="text-[32px] font-bold text-[#4e557d] mb-2">{title}</h2>
// //       <p className="text-black font-bold text-xl mb-10">{question}</p>
// //       <div className="space-y-6 mb-12">
// //         {options.map((opt: string) => (
// //           <label key={opt} className="flex items-center p-7 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#00a878] hover:bg-[#f0fdfa] transition-all group">
// //             <input type="radio" name="q" className="w-6 h-6 accent-[#00a878] mr-6" />
// //             <span className="text-slate-600 font-bold text-lg group-hover:text-[#00a878]">{opt}</span>
// //           </label>
// //         ))}
// //       </div>
// //       <div className="flex justify-between items-center">
// //         {onPrev ? (
// //           <button onClick={onPrev} className="text-slate-400 font-bold hover:text-slate-600 flex items-center gap-1">
// //             <ChevronLeft size={20}/> Back
// //           </button>
// //         ) : <div />}
// //         <button onClick={onNext} className="bg-[#00a878] text-white px-14 py-4 rounded-xl font-bold hover:bg-[#00966a] shadow-lg transition-all">
// //           Next Step
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }