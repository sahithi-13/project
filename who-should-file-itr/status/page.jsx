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
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [file, setFile] = useState(null);

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
    } else if (selectedStatus === "Individual") {
      router.push("/who-should-file-itr/details");
    } else if (selectedStatus === "HUF") {
      router.push("/who-should-file-itr/huf-itr");
    } else if (selectedStatus === "LLP") {
      router.push("/who-should-file-itr/llp-itr");
    } else if (selectedStatus === "Firm") {
      router.push("/who-should-file-itr/firm-itr");
    } else {
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
                    ${active
                      ? "border-[#00a878] shadow-[0_0_0_2px_rgba(0,168,120,0.25)]"
                      : "border-slate-200 hover:shadow-md"
                    }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center
                    ${active ? "bg-[#00a878] text-white" : "bg-[#eafff5] text-[#00a878]"
                      }`}
                  >
                    {item.icon}
                  </div>

                  <p
                    className={`text-sm font-semibold px-4 text-center ${active ? "text-[#00a878]" : "text-slate-800"
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
                  <div className="h-8" />
                  <div className="relative rounded-3xl text-center">
                    {/* ICON */}
                    <div className="flex justify-center mb-6">
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
                      {/* CENTERED ICON */}
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
                      className={`px-14 py-3 rounded-xl font-bold transition-all ${file
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
