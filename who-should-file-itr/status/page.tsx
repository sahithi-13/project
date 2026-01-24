"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  User,
  Users,
  Building,
  Briefcase,
  Building2,
  Scale,
  CheckCircle,
  FileUp,
  FileText,
  BarChart3,
} from "lucide-react";

export default function StatusPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const statusCards = [
    { key: "Individual", title: "Individual", icon: <User size={26} /> },
    { key: "HUF", title: "Hindu Undivided Family (HUF)", icon: <Users size={26} /> },
    { key: "Firm", title: "Firm (excluding LLP)", icon: <Building size={26} /> },
    { key: "LLP", title: "LLP", icon: <Briefcase size={26} /> },
    { key: "Company", title: "Company", icon: <Building2 size={26} /> },
    {
      key: "Trust",
      title: "Trust / Political Party / Institution / AOP / BOI / Local Authority",
      icon: <Scale size={26} />,
    },
    {
      key: "GST",
      title: "GST Services",
      icon: <FileText size={26} />,
    },
    {
      key: "MutualFunds",
      title: "Mutual Funds Resources",
      icon: <BarChart3 size={26} />,
    },
  ];

  
  const handleContinue = () => {
    if (!file) return;

    if (selectedStatus === "Company") {
      router.push("/who-should-file-itr/company-itr");
    } else if (selectedStatus === "Trust") {
      
      router.push("/who-should-file-itr/trust-itr");
    }
     else if (selectedStatus === "Individual") {
    
    router.push("/who-should-file-itr/details"); 
     }
     else if (selectedStatus === "huf") {
    // Redirects to Individual Flow
    router.push("/who-should-file-itr/huf-itr");
     }
     else if (selectedStatus === "LLP") {
    // Redirects to Individual Flow
    router.push("/who-should-file-itr/llp-itr");
     }
     else if (selectedStatus === "Firm") { 
      router.push("/who-should-file-itr/firm-itr");
    }
     else {
      router.push("/who-should-file-itr/details");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-10">
      <div className="w-full max-w-7xl">
        {/* BACK */}
        <Link
          href="/who-should-file-itr"
          className="inline-block mb-6 text-[#00a878] font-semibold text-sm hover:underline"
        >
          ← Back
        </Link>

        {/* HEADING */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
          <div className="lg:col-span-5 text-center">
            <h2 className="text-xl font-bold text-slate-800">Status Information:</h2>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: STATUS CARDS */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 justify-self-center">
            {statusCards.map((item) => {
              const active = selectedStatus === item.key;

              return (
                <div
                  key={item.key}
                  onClick={() => {
                    setSelectedStatus(item.key);
                    setFile(null);
                  }}
                  className={`h-40 w-[220px] rounded-2xl border
                    flex flex-col items-center justify-center text-center
                    cursor-pointer transition-all
                    ${
                      active
                        ? "border-[#00a878] shadow-[0_0_0_2px_rgba(0,168,120,0.25)]"
                        : "border-slate-200 hover:shadow-md"
                    }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center
                    ${
                      active ? "bg-[#00a878] text-white" : "bg-[#eafff5] text-[#00a878]"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <p
                    className={`text-sm font-semibold px-4 text-center ${
                      active ? "text-[#00a878]" : "text-slate-800"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT: DETAILS PANEL */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              className="h-[520px] w-full max-w-[560px]
                         bg-[#f2fdf9] border border-[#00a878]
                         rounded-3xl px-14 py-12
                         flex flex-col justify-between"
            >
              {!selectedStatus ? (
                <div className="flex items-center justify-center h-full text-center">
                  <p className="text-slate-500 text-sm">
                    Please select a status from the options on the left.
                  </p>
                </div>
              ) : (
                <>
                  {/* TOP */}
                  {/* <div className="flex flex-col items-center text-center space-y-6"> */}
                  <div className="h-8" />
                  <div className="relative rounded-3xl text-center">

  {/* ICON */}
                    <div
                      className="flex justify-center mb-6"
                    >
                      <CheckCircle size={48} className="text-[#00a878]" />
                    </div>

                    <h3 className="text-lg font-semibold text-[#00a878]">
                      You have selected "{selectedStatus}"
                    </h3>

                    <p className="text-slate-700 text-sm max-w-md leading-relaxed">
                      This status has been confirmed for your tax filing process confirmation.
                    </p>
                  </div>

                  {/* STATUS DETAILS */}
                  <div className="text-sm text-slate-800 space-y-3 mt-6 text-center">
                    <p className="font-semibold">Status Details:</p>
                    <ul className="list-disc list-inside space-y-1 inline-block text-left">
                      <li>Selected Category: {selectedStatus}</li>
                      <li>Status: Confirmed</li>
                      <li>Ready to Proceed: Yes</li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <label
                      className="
                        mt-10
                        w-full max-w-md
                        cursor-pointer
                        rounded-2xl border-2 border-dashed border-[#00a878]
                        bg-white px-6 py-6
                        flex flex-col items-center
                        hover:bg-[#e6fbf3]
                        transition-all
                      "
                    >
                      {/* ✅ CENTERED ICON */}
                      <div className="mb-4 h-12 w-12 rounded-full bg-[#e6fbf3] flex items-center justify-center">
                        <FileUp size={22} className="text-[#00a878]" />
                      </div>

                      {/* Title */}
                      <p className="text-[#00a878] font-semibold text-lg text-center">
                        Upload Required Document
                      </p>

                      {/* Helper text */}
                      <p className="mt-1 text-sm text-slate-500 text-center">
                        PDF, JPG or PNG • Max size 5MB
                      </p>

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>


                  

                  {/* UPLOAD BLOCK */}
                  
                  {file && (
                    <p className="text-xs text-green-600 text-center mt-2">
                      Uploaded: {file.name}
                    </p>
                  )}

                  {/* CONTINUE BUTTON */}
                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      disabled={!file}
                      onClick={handleContinue}
                      className={`px-14 py-3 rounded-xl font-bold transition-all ${
                        file
                          ? "bg-[#00a878] hover:bg-[#00966a] text-white"
                          : "bg-slate-300 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                  <div className="h-6" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import {
//   User,
//   Users,
//   Building,
//   Briefcase,
//   Building2,
//   Scale,
//   CheckCircle,
//   FileUp,
//   FileText,
//   BarChart3,
// } from "lucide-react";

// export default function StatusPage() {
//   const router = useRouter();
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);

//   const statusCards = [
//     { key: "Individual", title: "Individual", icon: <User size={26} /> },
//     { key: "HUF", title: "Hindu Undivided Family (HUF)", icon: <Users size={26} /> },
//     { key: "Firm", title: "Firm (excluding LLP)", icon: <Building size={26} /> },
//     { key: "LLP", title: "LLP", icon: <Briefcase size={26} /> },
//     { key: "Company", title: "Company", icon: <Building2 size={26} /> },
//     {
//       key: "Trust",
//       title:
//         "Trust / Political Party / Institution / AOP / BOI / Local Authority",
//       icon: <Scale size={26} />,
//     },
//     {
//       key: "GST",
//       title: "GST Services",
//       icon: <FileText size={26} />,
//     },
//     {
//       key: "MutualFunds",
//       title: "Mutual Funds Resources",
//       icon: <BarChart3 size={26} />,
//     },
//   ];
//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-10">
//       <div className="w-full max-w-7xl">

//         {/* BACK */}
//         <Link
//           href="/who-should-file-itr"
//           className="inline-block mb-6 text-[#00a878] font-semibold text-sm hover:underline"
//         >
//           ← Back
//         </Link>

//         {/* HEADING */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
//           <div className="lg:col-span-5 text-center">
//             <h2 className="text-xl font-bold text-slate-800">
//               Status Information:
//             </h2>
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

//           {/* LEFT: STATUS CARDS */}
//           <div className="lg:col-span-5 grid grid-cols-2 gap-8 justify-self-center">
//             {statusCards.map((item) => {
//               const active = selectedStatus === item.key;

//               return (
//                 <div
//                   key={item.key}
//                   onClick={() => {
//                     setSelectedStatus(item.key);
//                     setFile(null);
//                   }}
//                   className={`h-40 w-[220px] rounded-2xl border
//                     flex flex-col items-center justify-center text-center
//                     cursor-pointer transition-all
//                     ${
//                       active
//                         ? "border-[#00a878] shadow-[0_0_0_2px_rgba(0,168,120,0.25)]"
//                         : "border-slate-200 hover:shadow-md"
//                     }`}
//                 >
//                   <div
//                     className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center
//                     ${
//                       active
//                         ? "bg-[#00a878] text-white"
//                         : "bg-[#eafff5] text-[#00a878]"
//                     }`}
//                   >
//                     {item.icon}
//                   </div>

//                   <p
//                     className={`text-sm font-semibold px-4 text-center ${
//                       active ? "text-[#00a878]" : "text-slate-800"
//                     }`}
//                   >
//                     {item.title}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* RIGHT: DETAILS PANEL */}
//           <div className="lg:col-span-7 flex justify-center">
//             <div
//               className="h-[520px] w-full max-w-[560px]
//                          bg-[#f2fdf9] border border-[#00a878]
//                          rounded-3xl px-14 py-12
//                          flex flex-col justify-between"
//             >
//               {!selectedStatus ? (
//                 <div className="flex items-center justify-center h-full text-center">
//                   <p className="text-slate-500 text-sm">
//                     Please select a status from the options on the left.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   {/* TOP */}
//                   <div className="flex flex-col items-center text-center space-y-6">
//                     <div className="w-16 h-16 rounded-full border-4 border-[#00a878]
//                                     flex items-center justify-center">
//                       <CheckCircle size={36} className="text-[#00a878]" />
//                     </div>

//                     <h3 className="text-lg font-semibold text-[#00a878]">
//                       You have selected "{selectedStatus}"
//                     </h3>

//                     <p className="text-slate-700 text-sm max-w-md leading-relaxed">
//                       This status has been confirmed for your tax filing process
//                       confirmation.
//                     </p>
//                   </div>

//                   {/* STATUS DETAILS */}
//                   <div className="text-sm text-slate-800 space-y-3 mt-6 text-center">
//                     <p className="font-semibold">Status Details:</p>
//                     <ul className="list-disc list-inside space-y-1 inline-block text-left">
//                       <li>Selected Category: {selectedStatus}</li>
//                       <li>Status: Confirmed</li>
//                       <li>Ready to Proceed: Yes</li>
//                     </ul>
//                   </div>

//                   {/* UPLOAD BLOCK */}
//                   <label
//                     className="mt-6 border-2 border-dashed border-[#00a878]
//                                rounded-lg px-6 py-4
//                                cursor-pointer
//                                inline-flex items-center justify-center gap-3
//                                text-[#00a878] hover:bg-[#e6fbf3]
//                                transition-all mx-auto"
//                   >
//                     <FileUp size={20} />
//                     <span className="text-sm font-medium">
//                       Upload Required Document
//                     </span>

//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) =>
//                         setFile(e.target.files?.[0] || null)
//                       }
//                     />
//                   </label>

//                   {file && (
//                     <p className="text-xs text-green-600 text-center mt-2">
//                       Uploaded: {file.name}
//                     </p>
//                   )}

//                   {/* CONTINUE */}
//                   <div className="flex justify-center mt-4">
//                     <button
//                       type="button"
//                       disabled={!file}
//                       onClick={() => {
//                         if (selectedStatus === "Firm") {
//                           router.push("/who-should-file-itr/details");
//                         } else {
//                           router.push("/who-should-file-itr/details");
//                         }
//                       }}
//                       className={`px-14 py-3 rounded-xl font-bold transition-all
//                         ${
//                           file
//                             ? "bg-[#00a878] hover:bg-[#00966a] text-white"
//                             : "bg-slate-300 text-slate-500 cursor-not-allowed"
//                         }`}
//                     >
//                       Continue
//                     </button>

//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }








// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";

// // import {
// //   User,
// //   Users,
// //   Building,
// //   Briefcase,
// //   Building2,
// //   Scale,
// //   CheckCircle,
// //   FileUp,
// // } from "lucide-react";

// // export default function StatusPage() {
// //   const router = useRouter();
// //   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
// //   const [file, setFile] = useState<File | null>(null);

// //   const statusCards = [
// //     { key: "Individual", title: "Individual", icon: <User size={26} /> },
// //     { key: "HUF", title: "Hindu Undivided Family (HUF)", icon: <Users size={26} /> },
// //     { key: "Firm", title: "Firm (excluding LLP)", icon: <Building size={26} /> },
// //     { key: "LLP", title: "LLP", icon: <Briefcase size={26} /> },
// //     { key: "Company", title: "Company", icon: <Building2 size={26} /> },
// //     {
// //       key: "Trust",
// //       title:
// //         "Trust / Political Party / Institution / AOP / BOI / Local Authority",
// //       icon: <Scale size={26} />,
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-white flex items-center justify-center px-10">
// //       <div className="w-full max-w-7xl">

// //         {/* BACK */}
// //         <Link
// //           href="/who-should-file-itr"
// //           className="inline-block mb-6 text-[#00a878] font-semibold text-sm hover:underline"
// //         >
// //           ← Back
// //         </Link>

// //         {/* HEADING */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
// //           <div className="lg:col-span-5 text-center">
// //             <h2 className="text-xl font-bold text-slate-800">
// //               Status Information:
// //             </h2>
// //           </div>
// //         </div>

// //         {/* MAIN CONTENT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

// //           {/* LEFT: STATUS CARDS */}
// //           <div className="lg:col-span-5 grid grid-cols-2 gap-8 justify-self-center">
            
// //             {statusCards.map((item) => {
// //               const active = selectedStatus === item.key;

// //               return (
// //                 <div
// //                   key={item.key}
// //                   onClick={() => {
// //                     setSelectedStatus(item.key);
// //                     setFile(null);
// //                   }}
// //                   className={`h-40 w-[220px] rounded-2xl border
// //                     flex flex-col items-center justify-center text-center
// //                     cursor-pointer transition-all
// //                     ${
// //                       active
// //                         ? "border-[#00a878] shadow-[0_0_0_2px_rgba(0,168,120,0.25)]"
// //                         : "border-slate-200 hover:shadow-md"
// //                     }`}
// //                 >
                
// //                   <div
// //                     className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center
// //                     ${
// //                       active
// //                         ? "bg-[#00a878] text-white"
// //                         : "bg-[#eafff5] text-[#00a878]"
// //                     }`}
// //                   >
// //                     {item.icon}
// //                   </div>
                  
// //                   <p
// //                     className={`text-sm font-semibold px-4 text-center ${
// //                       active ? "text-[#00a878]" : "text-slate-800"
// //                     }`}
// //                   >
// //                     {item.title}
// //                   </p>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* RIGHT: DETAILS PANEL */}
// //           <div className="lg:col-span-7 flex justify-center">
// //             <div
// //               className="h-[520px] w-full max-w-[560px]
// //                          bg-[#f2fdf9] border border-[#00a878]
// //                          rounded-3xl px-14 py-12
// //                          flex flex-col justify-between"
// //             >
// //               {!selectedStatus ? (
// //                 <div className="flex items-center justify-center h-full text-center">
// //                   <p className="text-slate-500 text-sm">
// //                     Please select a status from the options on the left.
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {/* TOP SECTION */}
// //                   <div className="flex flex-col items-center text-center space-y-6">
// //                     <div className="w-16 h-16 rounded-full border-4 border-[#00a878]
// //                                     flex items-center justify-center">
// //                       <CheckCircle size={36} className="text-[#00a878]" />
// //                     </div>
// //                     <div className="h-12"/>

// //                     <h3 className="text-lg font-semibold text-[#00a878]">
// //                       You have selected "{selectedStatus}"
// //                     </h3>

// //                     <p className="text-slate-700 text-sm max-w-md leading-relaxed">
// //                       This status has been confirmed for your tax filing process
// //                       confirmation.
// //                     </p>
// //                   </div>

// //                   {/* STATUS DETAILS */}
// //                   <div className="text-sm text-slate-800 space-y-3 mt-6 text-center">
// //                     <p className="font-semibold">Status Details:</p>

// //                     <ul className="list-disc list-inside space-y-1 inline-block text-left">
// //                       <li>Selected Category: {selectedStatus}</li>
// //                       <li>Status: Confirmed</li>
// //                       <li>Ready to Proceed: Yes</li>
// //                     </ul>
// //                   </div>


// //                   {/* UPLOAD BLOCK */}
// //                   <label
// //                     className="mt-6 border-2 border-dashed border-[#00a878]
// //                                rounded-xl p-6 cursor-pointer
// //                                flex flex-col items-center justify-center
// //                                text-[#00a878] hover:bg-[#e6fbf3]
// //                                transition-all space-y-2"
// //                   >
// //                     <FileUp size={28} />
// //                     <span className="text-sm font-medium">
// //                       Upload Required Document
// //                     </span>

// //                     <input
// //                       type="file"
// //                       className="hidden"
// //                       onChange={(e) =>
// //                         setFile(e.target.files?.[0] || null)
// //                       }
// //                     />

// //                     {file && (
// //                       <p className="text-xs text-green-600 mt-1">
// //                         Uploaded: {file.name}
// //                       </p>
// //                     )}
// //                   </label>

// //                   {/* CONTINUE */}
// //                   <div className="flex justify-center mt-4">
// //                     <button
// //                       type="button"
// //                       disabled={!file}
// //                       onClick={() =>
// //                         router.push("/who-should-file-itr/details")
// //                       }
// //                       className={`px-14 py-3 rounded-xl font-bold transition-all
// //                         ${
// //                           file
// //                             ? "bg-[#00a878] hover:bg-[#00966a] text-white"
// //                             : "bg-slate-300 text-slate-500 cursor-not-allowed"
// //                         }`}
// //                     >
// //                       Continue
// //                     </button>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";

// // import {
// //   User,
// //   Users,
// //   Building,
// //   Briefcase,
// //   Building2,
// //   Scale,
// //   CheckCircle,
// //   Upload,
// // } from "lucide-react";

// // export default function StatusPage() {
// //   const router = useRouter();
// //   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
// //   const [file, setFile] = useState<File | null>(null);

// //   const statusCards = [
// //     { key: "Individual", title: "Individual", icon: <User size={26} /> },
// //     { key: "HUF", title: "Hindu Undivided Family (HUF)", icon: <Users size={26} /> },
// //     { key: "Firm", title: "Firm (excluding LLP)", icon: <Building size={26} /> },
// //     { key: "LLP", title: "LLP", icon: <Briefcase size={26} /> },
// //     { key: "Company", title: "Company", icon: <Building2 size={26} /> },
// //     {
// //       key: "Trust",
// //       title:
// //         "Trust / Political Party / Institution / AOP / BOI / Local Authority",
// //       icon: <Scale size={26} />,
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-white flex items-center justify-center px-10">
// //       <div className="w-full max-w-7xl">

// //         {/* BACK */}
// //         <Link
// //           href="/who-should-file-itr"
// //           className="inline-block mb-6 text-[#00a878] font-semibold text-sm hover:underline"
// //         >
// //           ← Back
// //         </Link>

// //         {/* HEADING */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
// //           <div className="lg:col-span-5 text-center">
// //             <h2 className="text-xl font-bold text-slate-800">
// //               Status Information:
// //             </h2>
// //           </div>
// //         </div>

// //         {/* MAIN CONTENT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

// //           {/* LEFT: STATUS CARDS */}
// //           <div className="lg:col-span-5 grid grid-cols-2 gap-8 justify-self-center">
// //             {statusCards.map((item) => {
// //               const active = selectedStatus === item.key;

// //               return (
// //                 <div
// //                   key={item.key}
// //                   onClick={() => {
// //                     setSelectedStatus(item.key);
// //                     setFile(null); // reset upload on change
// //                   }}
// //                   className={`h-40 w-[220px] rounded-2xl border
// //                     flex flex-col items-center justify-center text-center
// //                     cursor-pointer transition-all
// //                     ${
// //                       active
// //                         ? "border-[#00a878] shadow-[0_0_0_2px_rgba(0,168,120,0.25)]"
// //                         : "border-slate-200 hover:shadow-md"
// //                     }`}
// //                 >
// //                   <div
// //                     className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center
// //                     ${
// //                       active
// //                         ? "bg-[#00a878] text-white"
// //                         : "bg-[#eafff5] text-[#00a878]"
// //                     }`}
// //                   >
// //                     {item.icon}
// //                   </div>

// //                   <p
// //                     className={`text-sm font-semibold px-4 ${
// //                       active ? "text-[#00a878]" : "text-slate-800"
// //                     }`}
// //                   >
// //                     {item.title}
// //                   </p>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* RIGHT: DETAILS PANEL */}
// //           <div className="lg:col-span-7 flex justify-center">
// //             <div className="h-[480px] w-full max-w-[520px]
// //                             bg-[#f2fdf9] border border-[#00a878]
// //                             rounded-2xl px-12 py-10
// //                             flex flex-col justify-between">

// //               {!selectedStatus ? (
// //                 <div className="flex items-center justify-center h-full text-center">
// //                   <p className="text-slate-500 text-sm">
// //                     Please select a status from the options on the left.
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {/* TOP */}
// //                   <div className="text-center space-y-4">
// //                     <CheckCircle size={56} className="mx-auto text-[#00a878]" />
// //                     <p className="text-[#00a878] font-semibold">
// //                       You have selected "{selectedStatus}"
// //                     </p>
// //                   </div>

// //                   {/* DESCRIPTION */}
// //                   <p className="text-slate-700 text-sm text-center leading-relaxed">
// //                     This status has been confirmed for your tax filing process confirmation.
// //                   </p>

// //                   {/* DETAILS */}
// //                   <div className="text-sm text-slate-800 space-y-2">
// //                     <p className="font-semibold">Status Details:</p>
// //                     <ul className="list-disc ml-5 space-y-1">
// //                       <li>Selected Category: {selectedStatus}</li>
// //                       <li>Status: Confirmed</li>
// //                       <li>Ready to Proceed: Yes</li>
// //                     </ul>
// //                   </div>

// //                   {/* FILE UPLOAD */}
// //                   <div className="flex flex-col items-center space-y-3">
// //                     <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
// //                       <Upload size={18} />
// //                       Upload Required Document
// //                       <input
// //                         type="file"
// //                         className="hidden"
// //                         onChange={(e) => setFile(e.target.files?.[0] || null)}
// //                       />
// //                     </label>

// //                     {file && (
// //                       <p className="text-xs text-green-600">
// //                         Uploaded: {file.name}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* CONTINUE */}
// //                   <div className="flex justify-center">
// //                     <button
// //                       type="button"
// //                       disabled={!file}
// //                       onClick={() => router.push("/who-should-file-itr/details")}
// //                       className={`px-12 py-3 rounded-xl font-bold transition-all
// //                         ${
// //                           file
// //                             ? "bg-[#00a878] hover:bg-[#00966a] text-white"
// //                             : "bg-slate-300 text-slate-500 cursor-not-allowed"
// //                         }`}
// //                     >
// //                       Continue
// //                     </button>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>
          

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import {
// //   User,
// //   Users,
// //   Building,
// //   Briefcase,
// //   Building2,
// //   Scale,
// //   CheckCircle,
// // } from "lucide-react";

// // export default function StatusPage() {
// //   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

// //   const statusCards = [
// //     { key: "Individual", title: "Individual", icon: <User size={26} /> },
// //     {
// //       key: "HUF",
// //       title: "Hindu Undivided Family (HUF)",
// //       icon: <Users size={26} />,
// //     },
// //     {
// //       key: "Firm",
// //       title: "Firm (excluding LLP)",
// //       icon: <Building size={26} />,
// //     },
// //     { key: "LLP", title: "LLP", icon: <Briefcase size={26} /> },
// //     { key: "Company", title: "Company", icon: <Building2 size={26} /> },
// //     {
// //       key: "Trust",
// //       title:
// //         "Trust / Political Party / Institution / AOP / BOI / Local Authority",
// //       icon: <Scale size={26} />,
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-white flex items-center justify-center px-10">
// //       <div className="w-full max-w-7xl">

// //         {/* BACK */}
// //         <Link
// //           href="/who-should-file-itr"
// //           className="inline-block mb-6 text-[#00a878] font-semibold text-sm hover:underline"
// //         >
// //           ← Back
// //         </Link>

// //         {/* HEADING */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
// //           <div className="lg:col-span-5 text-center">
// //             <h2 className="text-xl font-bold text-slate-800">
// //               Status Information:
// //             </h2>
// //           </div>
// //         </div>

// //         {/* MAIN LAYOUT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

// //           {/* LEFT: STATUS CARDS */}
// //           <div className="lg:col-span-5 grid grid-cols-2 gap-8 justify-self-center">
// //             {statusCards.map((item) => {
// //               const isActive = selectedStatus === item.key;

// //               return (
// //                 <div
// //                   key={item.key}
// //                   onClick={() => setSelectedStatus(item.key)}
// //                   className={`h-40 w-[220px] rounded-2xl border
// //                     flex flex-col items-center justify-center text-center
// //                     cursor-pointer transition-all
// //                     ${
// //                       isActive
// //                         ? "border-[#00a878] shadow-[0_0_0_2px_rgba(0,168,120,0.2)]"
// //                         : "border-slate-200 hover:shadow-md"
// //                     }`}
// //                 >
// //                   <div
// //                     className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center
// //                     ${
// //                       isActive
// //                         ? "bg-[#00a878] text-white"
// //                         : "bg-[#eafff5] text-[#00a878]"
// //                     }`}
// //                   >
// //                     {item.icon}
// //                   </div>

// //                   <p
// //                     className={`text-sm font-semibold px-4 leading-snug ${
// //                       isActive ? "text-[#00a878]" : "text-slate-800"
// //                     }`}
// //                   >
// //                     {item.title}
// //                   </p>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* RIGHT: INFO PANEL */}
// //           <div className="lg:col-span-7 flex justify-center">
// //             <div
// //               className="h-[460px] w-full max-w-[520px]
// //                          bg-[#f2fdf9] border border-[#00a878]
// //                          rounded-2xl px-12 py-10 flex flex-col justify-between"
// //             >
// //               {!selectedStatus ? (
// //                 <div className="flex items-center justify-center h-full text-center">
// //                   <p className="text-slate-500 text-sm leading-relaxed">
// //                     Please select a status from the options on the left to see
// //                     confirmation details here...
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {/* ICON + CONFIRM */}
// //                   <div className="text-center space-y-4">
// //                     <CheckCircle
// //                       size={56}
// //                       className="mx-auto text-[#00a878]"
// //                     />
// //                     <p className="text-[#00a878] font-semibold">
// //                       You have selected "{selectedStatus}"
// //                     </p>
// //                   </div>

// //                   {/* MESSAGE */}
// //                   <p className="text-slate-700 text-sm leading-relaxed text-center">
// //                     This status has been confirmed for your tax filing process.
// //                     You can now proceed with the next steps.
// //                   </p>

// //                   {/* DETAILS */}
// //                   <div className="text-sm text-slate-800 space-y-2">
// //                     <p className="font-semibold">Status Details:</p>
// //                     <ul className="list-disc ml-5 space-y-1">
// //                       <li>Selected Category: {selectedStatus}</li>
// //                       <li>Status: Confirmed</li>
// //                       <li>Ready to Proceed: Yes</li>
// //                     </ul>
// //                   </div>

// //                   {/* CONTINUE */}
// //                   <div className="flex justify-center">
// //                     <button
// //                       type="button"
// //                       className="bg-[#00a878] hover:bg-[#00966a]
// //                                  text-white font-bold px-12 py-3
// //                                  rounded-xl transition-all"
// //                     >
// //                       Continue
// //                     </button>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // "use client";

// // import Link from "next/link";
// // import {
// //   User,
// //   Users,
// //   Building,
// //   Briefcase,
// //   Building2,
// //   Scale,
// // } from "lucide-react";

// // export default function StatusPage() {
// //   const statusCards = [
// //     { title: "Individual", icon: <User size={26} /> },
// //     { title: "Hindu Undivided Family (HUF)", icon: <Users size={26} /> },
// //     { title: "Firm (excluding LLP)", icon: <Building size={26} /> },
// //     { title: "LLP", icon: <Briefcase size={26} /> },
// //     { title: "Company", icon: <Building2 size={26} /> },
// //     {
// //       title:
// //         "Trust / Political Party / Institution / AOP / BOI / Local Authority",
// //       icon: <Scale size={26} />,
// //     },
// //   ];

// //   return (
// //     // 1️⃣ CENTER ENTIRE PAGE
// //     <div className="min-h-screen bg-white flex items-center justify-center px-10">

// //       <div className="w-full max-w-7xl">

// //         {/* BACK LINK */}
// //         <Link
// //           href="/who-should-file-itr"
// //           className="inline-block mb-6 text-[#00a878] font-semibold text-sm hover:underline"
// //         >
// //           ← Back
// //         </Link>

// //         {/* 2️⃣ HEADING CENTERED TO ICONS */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
// //           <div className="lg:col-span-5 text-center">
// //             <h2 className="text-xl font-bold text-slate-800">
// //               Status Information:
// //             </h2>
// //           </div>
// //           <div className="h-10"/>
// //         </div>

// //         {/* 3️⃣ MAIN CONTENT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

// //           {/* LEFT: ICONS */}
// //           <div className="lg:col-span-5 grid grid-cols-2 gap-8 justify-self-center">
// //             {statusCards.map((item, index) => (
// //               <div
// //                 key={index}
// //                 className="h-40 w-[220px] bg-white border border-slate-200
// //                            rounded-2xl flex flex-col items-center justify-center
// //                            text-center shadow-sm hover:shadow-md transition-all"
// //               >
// //                 <div
// //                   className="w-16 h-16 rounded-full bg-[#eafff5]
// //                              flex items-center justify-center text-[#00a878]
// //                              mb-4 shadow-[0_0_20px_rgba(0,168,120,0.15)]"
// //                 >
// //                   {item.icon}
// //                 </div>

// //                 <p className="text-sm font-semibold text-slate-800 px-4 leading-snug">
// //                   {item.title}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* RIGHT: INFO PANEL */}
// //           <div className="lg:col-span-7 flex justify-center">
// //             <div
// //               className="h-[460px] w-full max-w-[520px]
// //                          bg-[#f2fdf9] border border-[#c7f0df]
// //                          rounded-2xl flex items-center justify-center
// //                          text-center px-14"
// //             >
// //               <p className="text-slate-500 text-sm max-w-md leading-relaxed">
// //                 Please select a status from the options on the left to see
// //                 confirmation details here...
// //               </p>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
