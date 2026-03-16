import React, { useState, useRef, useEffect } from 'react';
import { Printer, Info } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  designation?: string;
  image: string | null;
}

export default function App() {
  const [committee, setCommittee] = useState<Member[]>([
    { id: 1, name: 'জাহাঙ্গীর', designation: 'সভাপতি', image: null },
    { id: 2, name: 'নাদিম হাসান', designation: 'প্রচার সম্পাদক', image: null },
    { id: 3, name: 'খাইরুল হক', designation: 'প্রধান পরামর্শক', image: null },
    { id: 4, name: 'শাহ পরান', designation: 'হিসাব-রক্ষক', image: null },
    { id: 5, name: 'সোহাগ মিয়া', designation: 'সাধারন সম্পাদক', image: null },
    { id: 6, name: 'রাজু আহমেদ', designation: 'সাধারন সম্পাদক', image: null },
    { id: 7, name: 'হারুনুর রশিদ', designation: 'সাধারন সম্পাদক', image: null },
    { id: 8, name: 'হৃদয় হাসান', designation: 'সাধারন সম্পাদক', image: null },
    { id: 9, name: 'নাঈম হাসান', designation: 'সাধারন সম্পাদক', image: null },
  ]);

  const [general, setGeneral] = useState<Member[]>([
    { id: 10, name: 'হাসিবুল হাসান শান্ত', image: null },
    { id: 11, name: 'রিয়াদ আহমেদ', image: null },
    { id: 12, name: 'তানভীর আহমেদ', image: null },
    { id: 13, name: 'আরমান আহমেদ', image: null },
    { id: 14, name: 'রাকিব রায়হান', image: null },
    { id: 15, name: 'বশির মিয়া', image: null },
    { id: 16, name: 'ইউনুস মিয়া', image: null },
    { id: 17, name: 'ইমন মিয়া', image: null },
    { id: 18, name: 'ইদন মিয়া', image: null },
    { id: 19, name: 'মামুন মিয়া', image: null },
    { id: 20, name: 'মোক্তার আহমেদ', image: null },
    { id: 21, name: 'জাবেদ উমর', image: null },
    { id: 22, name: 'মোক্তার মিয়া', image: null },
    { id: 23, name: 'আল-ইসলাম', image: null },
    { id: 24, name: 'শুক্কুর আলম', image: null },
    { id: 25, name: 'মাসুম আহমেদ', image: null },
    { id: 26, name: 'আব্দুর রাজ্জাক', image: null },
    { id: 27, name: 'গোলাপ মিয়া', image: null },
    { id: 28, name: 'সাগর মিয়া', image: null },
    { id: 29, name: 'তাজু আহমেদ', image: null },
  ]);

  const committeeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const generalRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCommitteeUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCommittee((prev) => {
        const newMembers = [...prev];
        newMembers[index] = { ...newMembers[index], image: imageUrl };
        return newMembers;
      });
    }
  };

  const handleGeneralUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setGeneral((prev) => {
        const newMembers = [...prev];
        newMembers[index] = { ...newMembers[index], image: imageUrl };
        return newMembers;
      });
    }
  };

  const triggerCommitteeInput = (index: number) => {
    committeeRefs.current[index]?.click();
  };

  const triggerGeneralInput = (index: number) => {
    generalRefs.current[index]?.click();
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    function scaleBannerToFit() {
      const wrapper = document.getElementById('scale-wrapper');
      const canvas = document.getElementById('poster-canvas');
      if (!wrapper || !canvas) return;

      const margin = 64; 
      const windowWidth = window.innerWidth - margin;
      const windowHeight = window.innerHeight - margin - 100;
      
      const posterWidth = 1800;
      const posterHeight = 1200;
      
      const scaleX = windowWidth / posterWidth;
      const scaleY = windowHeight / posterHeight;
      const scale = Math.min(scaleX, scaleY, 1); 
      
      wrapper.style.width = `${posterWidth * scale}px`;
      wrapper.style.height = `${posterHeight * scale}px`;
      canvas.style.transformOrigin = 'top left';
      canvas.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', scaleBannerToFit);
    setTimeout(scaleBannerToFit, 100);

    return () => window.removeEventListener('resize', scaleBannerToFit);
  }, []);

  return (
    <div className="min-h-screen bg-black py-8 print:py-0 print:bg-transparent flex flex-col items-center">
      <div className="no-print w-full max-w-5xl bg-gray-900 p-4 rounded-xl shadow-md mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-800 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-teal-900/50 p-2 rounded-lg text-teal-400">
            <Info size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-100">Premium Banner Editor</h1>
            <p className="text-sm text-gray-400">Click ANY text to edit it. Click photo placeholders to upload images.</p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Printer size={20} />
          Print / Save as PDF
        </button>
      </div>

      <div id="scale-wrapper" className="relative shadow-2xl overflow-hidden shrink-0 rounded-md">
        <div id="poster-canvas" className="bg-gradient-to-b from-[#022c22] via-[#0f766e] to-[#064e3b] relative flex flex-col justify-between overflow-hidden" style={{ width: '1800px', height: '1200px' }}>
            
            <div className="absolute top-[-200px] left-[-100px] w-[1100px] h-[900px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[1000px] h-[800px] bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[35%] left-[50%] translate-x-[-50%] w-[1600px] h-[600px] glow-circle pointer-events-none"></div>
            
            <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] border-[2px] border-white/5 rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-[200px] -left-[200px] w-[700px] h-[700px] border-[2px] border-teal-200/5 rounded-full pointer-events-none"></div>

            <div className="relative z-10 pt-[10px] flex flex-col items-center text-center w-full px-12">
                <h3 contentEditable suppressContentEditableWarning className="font-serif-bn text-[#fef08a] text-[24px] tracking-[3px] mb-1 font-bold drop-shadow-md outline-none hover:bg-white/10 px-2 rounded cursor-text">
                    বিসমিল্লাহির রাহমানির রাহিম
                </h3>
                
                <h1 contentEditable suppressContentEditableWarning className="font-display-bn text-[90px] font-extrabold title-effect leading-none mb-1 mt-1 outline-none hover:bg-white/10 px-4 rounded cursor-text">
                    মানবতার দল ও যুব সংগঠন
                </h1>
                
                <h2 contentEditable suppressContentEditableWarning className="font-sans-bn text-[#fde047] text-[42px] font-extrabold drop-shadow-lg mb-2 tracking-wide outline-none hover:bg-white/10 px-4 rounded cursor-text">
                    (মির্জারচর ৬ নং ওয়ার্ড)
                </h2>
                
                <div className="inline-flex items-center bg-[#0d9488]/40 border border-[#2dd4bf]/20 px-5 py-[1px] rounded-full mb-2 shadow-[0_0_8px_rgba(45,212,191,0.15)]">
                    <p className="font-sans-bn text-white text-[18px] font-medium tracking-wide flex items-center gap-1">
                        <span contentEditable suppressContentEditableWarning className="outline-none hover:bg-white/10 px-2 py-1 rounded cursor-text">প্রতিষ্ঠাকাল - </span>
                        <span contentEditable suppressContentEditableWarning className="text-[#fef08a] font-bold outline-none hover:bg-white/10 px-2 py-1 rounded cursor-text">২০২৬</span>
                    </p>
                </div>
                
                <div className="font-sans-bn text-white text-[22px] font-semibold drop-shadow-lg w-full flex flex-col items-center leading-tight">
                    <p contentEditable suppressContentEditableWarning className="text-[#fef08a] outline-none hover:bg-white/10 px-2 rounded cursor-text">মানুষ মানুষের জন্য, জীবন মানবতার কল্যাণের জন্য—</p>
                    <p contentEditable suppressContentEditableWarning className="text-gray-100 font-medium mt-1 outline-none hover:bg-white/10 px-2 rounded cursor-text">আর্তমানবতার সেবায় এগিয়ে আসুন, আপনার একটু সহানুভূতি বদলে দিতে পারে একটি জীবন</p>
                </div>

                <div className="w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#fde047] to-transparent mt-3 mb-1 opacity-70"></div>
            </div>

            <div className="relative z-10 w-[1740px] mx-auto glass-panel rounded-[30px] px-[30px] py-[10px] my-auto">
                <div className="flex items-center justify-center mb-[6px] mt-[1px]">
                    <div className="w-[200px] h-[1px] bg-gradient-to-r from-transparent to-[#fde047] opacity-60"></div>
                    <h2 className="font-display-bn text-[30px] font-extrabold text-white mx-5 drop-shadow-md tracking-wide flex gap-2">
                        <span contentEditable suppressContentEditableWarning className="outline-none hover:bg-white/10 px-2 rounded cursor-text">সংগঠন</span>
                        <span contentEditable suppressContentEditableWarning className="text-[#fde047] outline-none hover:bg-white/10 px-2 rounded cursor-text">পরিচালক</span>
                    </h2>
                    <div className="w-[200px] h-[1px] bg-gradient-to-l from-transparent to-[#fde047] opacity-60"></div>
                </div>

                <div className="grid grid-cols-9 gap-x-[15px] mb-[10px] px-[10px]">
                    {committee.map((member, index) => (
                        <div key={member.id} className="flex flex-col items-center">
                            <div className="member-card w-full p-[5px] rounded-[18px] flex flex-col items-center relative transition-transform duration-300 hover:scale-105">
                                <div 
                                  className="w-full aspect-square bg-gray-50/90 rounded-[12px] border-[2px] border-white/80 shadow-inner overflow-hidden flex justify-center items-center relative cursor-pointer"
                                  onClick={() => triggerCommitteeInput(index)}
                                >
                                    {member.image ? (
                                        <img src={member.image} className="w-full h-full object-cover object-top" alt={member.name} />
                                    ) : (
                                        <svg className="w-1/2 h-1/2 text-teal-700/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                    )}
                                </div>
                                <div className="w-[105%] bg-gradient-to-r from-[#0d9488] to-[#0f766e] border border-teal-400/40 shadow-lg mt-[8px] py-[4px] px-1 rounded-[8px] text-center relative z-10 flex flex-col justify-center">
                                    <p contentEditable suppressContentEditableWarning className="font-sans-bn text-white text-[15px] font-bold leading-[1.3] tracking-wide pt-[2px] px-1 whitespace-nowrap overflow-hidden text-ellipsis outline-none hover:bg-white/10 rounded cursor-text">{member.name}</p>
                                    <p contentEditable suppressContentEditableWarning className="font-sans-bn text-[#fef08a] text-[11px] font-medium leading-[1.3] tracking-wide pb-[1px] px-1 outline-none hover:bg-white/10 rounded cursor-text">{member.designation}</p>
                                </div>
                                <input type="file" accept="image/*" className="hidden" ref={(el) => (committeeRefs.current[index] = el)} onChange={(e) => handleCommitteeUpload(index, e)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center mb-[6px] mt-[4px]">
                    <div className="w-[200px] h-[1px] bg-gradient-to-r from-transparent to-[#fde047] opacity-60"></div>
                    <h2 className="font-display-bn text-[30px] font-extrabold text-white mx-5 drop-shadow-md tracking-wide flex gap-1">
                        <span contentEditable suppressContentEditableWarning className="outline-none hover:bg-white/10 px-2 rounded cursor-text">সদস্য</span>
                        <span contentEditable suppressContentEditableWarning className="text-[#fde047] outline-none hover:bg-white/10 px-2 rounded cursor-text">বৃন্দ</span>
                    </h2>
                    <div className="w-[200px] h-[1px] bg-gradient-to-l from-transparent to-[#fde047] opacity-60"></div>
                </div>

                <div className="grid grid-cols-10 gap-x-[14px] gap-y-[10px] px-[5px]">
                    {general.map((member, index) => (
                        <div key={member.id} className="flex flex-col items-center">
                            <div className="member-card w-full p-[4px] rounded-[14px] flex flex-col items-center relative transition-transform duration-300 hover:scale-105">
                                <div 
                                  className="w-full aspect-square bg-gray-50/90 rounded-[10px] border-[2px] border-white/70 shadow-inner overflow-hidden flex justify-center items-center relative cursor-pointer"
                                  onClick={() => triggerGeneralInput(index)}
                                >
                                    {member.image ? (
                                        <img src={member.image} className="w-full h-full object-cover object-top" alt={member.name} />
                                    ) : (
                                        <svg className="w-1/2 h-1/2 text-teal-700/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                    )}
                                </div>
                                <div className="w-[108%] bg-gradient-to-r from-[#0d9488] to-[#0f766e] border border-teal-400/40 shadow-lg mt-[6px] py-[4px] px-1 rounded-full text-center relative z-10 flex flex-col justify-center">
                                    <p contentEditable suppressContentEditableWarning className="font-sans-bn text-white text-[13px] font-bold leading-[1.3] tracking-wide pt-[2px] pb-[1px] px-1 whitespace-nowrap overflow-hidden text-ellipsis outline-none hover:bg-white/10 rounded cursor-text">{member.name}</p>
                                </div>
                                <input type="file" accept="image/*" className="hidden" ref={(el) => (generalRefs.current[index] = el)} onChange={(e) => handleGeneralUpload(index, e)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 w-full pb-[10px] pt-0 flex justify-center items-center shrink-0">
                <div className="absolute left-[200px] w-[200px] h-[200px] glow-flare pointer-events-none"></div>
                <h2 className="font-display-bn text-[38px] font-extrabold text-white drop-shadow-md z-20 flex items-center gap-4">
                    <span className="w-[40px] h-[1.5px] bg-white/60 rounded-full"></span>
                    <span contentEditable suppressContentEditableWarning className="outline-none hover:bg-white/10 px-2 rounded cursor-text">সৌজন্যে - </span>
                    <span contentEditable suppressContentEditableWarning className="gold-text-gradient outline-none hover:bg-white/10 px-2 rounded cursor-text">মানবতার যুব সংগঠন</span>
                    <span className="w-[40px] h-[1.5px] bg-white/60 rounded-full"></span>
                </h2>
                <div className="absolute right-[200px] w-[200px] h-[200px] glow-flare pointer-events-none"></div>
            </div>

        </div>
      </div>
    </div>
  );
}
