import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Brain, Cpu, Eye, Layers, Network, X, Zap, Box, Activity, ArrowRight,
  Users, Cloud, Command, Share2, Wind, FileText, Copy, Waves, Shield,
  Aperture, Briefcase, Target, Wrench, Sparkles, CircuitBoard,
  Play, Loader2, StopCircle, Globe, Trophy, Video, Shuffle, MessageSquare
} from 'lucide-react';

// --- API CONFIGURATION ---
const API_KEY = ""; 

// --- Data Models ---

interface TermData {
  id: string;
  title: string;
  icon: React.ElementType;
  shortDesc: string;
  description: string;
  useCase: string;
  color: string; // Kept for modal/detail accents
}

const terms: TermData[] = [
  {
    id: 'physical-ai',
    title: 'Physical AI',
    icon: Bot,
    shortDesc: 'AI that masters real-world physics and interaction.',
    description: 'Models that perceive, understand, and interact with complex physical environments, learning physics, weight, and friction to control bodies.',
    useCase: 'A robot learning to walk on ice by practicing in a physics-accurate simulation first.',
    color: 'bg-blue-600'
  },
  {
    id: 'embodied-ai',
    title: 'Embodied AI',
    icon: Box,
    shortDesc: 'Intelligence emerging from physical body interaction.',
    description: 'A paradigm where AI is not just software ("brain in a jar") but requires a physical body to interact with, learn from, and sense the environment to develop true intelligence.',
    useCase: 'A robot arm learning object permanence by physically pushing a cup behind a book and feeling it is still there.',
    color: 'bg-cyan-500'
  },
  {
    id: 'generative-robotics',
    title: 'Generative Robotics',
    icon: Brain,
    shortDesc: 'LLMs generating robot actions from language.',
    description: 'Using Foundation Models to translate natural language into robot code or action sequences on the fly.',
    useCase: 'Telling a robot "Clean that spill" and it autonomously finds a mop and plans the path.',
    color: 'bg-purple-600'
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    icon: Command,
    shortDesc: 'Autonomous goal-seeking without step-by-step code.',
    description: 'Systems that pursue broad goals independently, breaking them down into sub-tasks without explicit step-by-step programming.',
    useCase: 'A warehouse robot given the goal "Clear the loading dock" that figures out the order of boxes itself.',
    color: 'bg-emerald-600'
  },
  {
    id: 'humanoids',
    title: 'Humanoid Generalists',
    icon: Users, 
    shortDesc: 'Bipedal robots for human-centric environments.',
    description: 'Robots with human-like form factors designed to operate in environments built for people (stairs, doors, tools).',
    useCase: 'A humanoid robot working in a car factory, then switching to carry groceries in a home setting.',
    color: 'bg-red-600'
  },
  {
    id: 'sim2real',
    title: 'Sim2Real Transfer',
    icon: Layers,
    shortDesc: 'Transferring virtual skills to physical robots.',
    description: 'Training robot policies in high-speed digital twins and successfully transferring skills to physical hardware.',
    useCase: 'Training a mechanical hand to solve a Rubik’s cube in VR before touching a real one.',
    color: 'bg-indigo-600'
  },
  {
    id: 'swarm-intel',
    title: 'Swarm Intelligence',
    icon: Share2,
    shortDesc: 'Robots coordinating as a collective unit.',
    description: 'Multiple robots acting as a single cohesive unit, inspired by insect colonies, to accomplish tasks larger than any single individual.',
    useCase: 'Micro-drones coordinating to search a collapsed building for survivors.',
    color: 'bg-amber-500'
  },
  {
    id: 'visual-slam',
    title: 'Neural V-SLAM',
    icon: Eye,
    shortDesc: 'AI mapping 3D spaces with semantic understanding.',
    description: 'Visual Simultaneous Localization and Mapping enhanced by neural networks to identify objects while mapping spaces.',
    useCase: 'A delivery cart distinguishing between a wall (permanent) and a person (moving) while mapping.',
    color: 'bg-teal-600'
  },
  {
    id: 'edge-ai',
    title: 'Edge AI',
    icon: Cpu,
    shortDesc: 'Onboard processing for zero-latency decisions.',
    description: 'Running complex AI inference directly on local hardware for privacy and millisecond reaction times.',
    useCase: 'A drone dodging tree branches in real-time without internet connection.',
    color: 'bg-orange-600'
  },
  {
    id: 'soft-robotics',
    title: 'Soft Robotics',
    icon: Wind,
    shortDesc: 'Flexible materials for delicate manipulation.',
    description: 'Robots made from compliant materials that mimic living organisms, allowing for safer interaction with delicate objects.',
    useCase: 'A robotic gripper made of silicone handling soft fruit without bruising it.',
    color: 'bg-pink-600'
  },
  {
    id: 'neuromorphic',
    title: 'Neuromorphic Chips',
    icon: CircuitBoard,
    shortDesc: 'Brain-inspired chips for extreme efficiency.',
    description: 'Processors designed to mimic the neural structure of the human brain (spiking neural networks) for extreme energy efficiency.',
    useCase: 'A battery-powered insect robot running for weeks on a single charge.',
    color: 'bg-cyan-600'
  },
  {
    id: 'cobots',
    title: 'Cognitive Cobots',
    icon: Activity,
    shortDesc: 'Safe robots collaborating alongside humans.',
    description: 'Collaborative robots that sense human intent and proximity to work safely alongside people.',
    useCase: 'An assembly arm slowing down as a worker’s hand approaches.',
    color: 'bg-rose-600'
  },
  {
    id: 'explainable-ai',
    title: 'Explainable AI (XAI)',
    icon: FileText,
    shortDesc: 'AI that explains its decision-making logic.',
    description: 'AI systems designed to provide understandable reasons for their actions, crucial for safety certification.',
    useCase: 'A medical robot explaining why it chose a specific surgical incision path.',
    color: 'bg-slate-600'
  },
  {
    id: 'cloud-robotics',
    title: 'Cloud Robotics',
    icon: Cloud,
    shortDesc: 'Offloading heavy compute to remote servers.',
    description: 'Leveraging massive cloud server farms for non-time-critical processing like long-term memory or map merging.',
    useCase: 'A fleet of robots sharing a collective map of a city that updates overnight in the cloud.',
    color: 'bg-sky-500'
  },
  {
    id: 'digital-twins',
    title: 'Digital Twins',
    icon: Copy,
    shortDesc: 'Real-time virtual replicas for simulation.',
    description: 'Exact virtual replicas of physical systems that update in real-time, allowing for predictive simulation.',
    useCase: 'Simulating a factory floor change in software to see if robots will collide before moving machines.',
    color: 'bg-violet-600'
  },
  {
    id: 'haptic-feedback',
    title: 'Haptic Feedback',
    icon: Waves,
    shortDesc: 'Feeling remote touch through sensors.',
    description: 'Technology that transmits tactile information to a remote operator, allowing them to "feel" what the robot touches.',
    useCase: 'A surgeon feeling the resistance of tissue while operating a robot from another country.',
    color: 'bg-fuchsia-600'
  },
  {
    id: 'federated-learning',
    title: 'Federated Learning',
    icon: Shield,
    shortDesc: 'Privacy-preserving distributed training.',
    description: 'Training AI models across many decentralized devices without exchanging local data samples.',
    useCase: 'Home robots learning to navigate better layouts without sending photos of users\' homes to a central server.',
    color: 'bg-green-600'
  },
  {
    id: 'multimodal',
    title: 'Multimodal AI',
    icon: Aperture,
    shortDesc: 'Fusing vision, audio, and sensory data.',
    description: 'AI that integrates multiple types of data (vision, audio, depth, thermal) for a holistic understanding.',
    useCase: 'A rescue robot hearing a cry for help and using thermal cameras to pinpoint the location.',
    color: 'bg-yellow-500'
  },
  {
    id: 'raas',
    title: 'Robot-as-a-Service',
    icon: Briefcase,
    shortDesc: 'Robots available via subscription model.',
    description: 'A business model where companies lease robotic capabilities rather than buying hardware outright.',
    useCase: 'A farm hiring a fleet of weeding robots just for the harvest season.',
    color: 'bg-lime-600'
  },
  {
    id: 'zero-shot',
    title: 'Zero-Shot Learning',
    icon: Target,
    shortDesc: 'Performing tasks without prior specific training.',
    description: 'The ability of a robot to recognize objects or perform tasks it has never seen before during training.',
    useCase: 'A robot identifying and picking up a "mangosteen" despite only being trained on apples and oranges.',
    color: 'bg-red-500'
  },
  {
    id: 'lang-imitation',
    title: 'Lang-Conditioned Imitation',
    icon: MessageSquare,
    shortDesc: 'Learning tasks from language-guided demos.',
    description: 'A method where robots learn to map visual observations to actions, conditioned on language instructions, allowing them to perform tasks described in words.',
    useCase: 'A robot watching a human set a table and learning to "set the table" when asked.',
    color: 'bg-pink-500'
  },
  {
    id: 'diffusion-policies',
    title: 'Diffusion Policies',
    icon: Shuffle,
    shortDesc: 'Denoising generative models for smooth motion.',
    description: 'Adapting diffusion models (used in image generation) to represent complex, multimodal robot behavior distributions, enabling smooth and robust motion planning.',
    useCase: 'A robot arm pouring water precisely by generating the motion trajectory as a denoised sequence.',
    color: 'bg-violet-600'
  },
  {
    id: 'world-models',
    title: 'World Foundation Models',
    icon: Globe,
    shortDesc: 'Predicting future world states from video.',
    description: 'Large-scale models trained on vast video data to understand general physics and causality, allowing robots to predict what happens next in the world.',
    useCase: 'A self-driving car predicting a pedestrian will step onto the road based on subtle body language.',
    color: 'bg-indigo-700'
  },
  {
    id: 'cross-embodiment',
    title: 'Cross-Embodiment',
    icon: Network,
    shortDesc: 'One AI brain controlling diverse robot bodies.',
    description: 'Training a single AI model (policy) that can control widely different robot morphologies (e.g., a dog, a humanoid, and a drone) by learning shared representations.',
    useCase: 'The same navigation software controlling a wheeled delivery bot and a legged inspection dog.',
    color: 'bg-teal-500'
  },
  {
    id: 'incidental',
    title: 'Incidental Perception',
    icon: Video,
    shortDesc: 'Learning useful details implicitly while working.',
    description: 'The ability of a robot to capture and store information about its environment that isn\'t relevant to its current task but might be useful later.',
    useCase: 'A robot vacuum noting where the cat keys are while cleaning the floor, to answer "Where are my keys?" later.',
    color: 'bg-yellow-600'
  }
];

// --- Gemini API Utilities ---

const generateGeminiText = async (prompt: string) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to the neural network. Please try again.";
  }
};

const generateGeminiSpeech = async (text: string) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Kore" // Using a futuristic sounding voice
                }
              }
            }
          }
        }),
      }
    );
    const data = await response.json();
    const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (audioData) {
      return `data:audio/wav;base64,${audioData}`;
    }
    throw new Error("No audio data returned");
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};

// --- Components ---

const Modal = ({ term, onClose }: { term: TermData; onClose: () => void }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [insightType, setInsightType] = useState<'eli5' | 'risks' | 'startups' | null>(null);
  
  // TTS State
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!term) return null;

  const handleFetchInsight = async (type: 'eli5' | 'risks' | 'startups') => {
    setLoadingInsight(true);
    setInsightType(type);
    setInsight(null);
    
    let prompt = "";
    if (type === 'eli5') {
      prompt = `Explain the robotics concept "${term.title}" (${term.shortDesc}) simply to a 5 year old. Keep it fun and under 50 words.`;
    } else if (type === 'risks') {
      prompt = `What are the potential future risks or ethical challenges of "${term.title}" in 2030? Be concise, max 3 bullet points.`;
    } else if (type === 'startups') {
      prompt = `Suggest 2 innovative hypothetical startup ideas using "${term.title}" technology. Be concise.`;
    }

    const result = await generateGeminiText(prompt);
    setInsight(result);
    setLoadingInsight(false);
  };

  const handlePlayAudio = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setLoadingAudio(true);
    // Construct a script for the TTS
    const script = `Reviewing term: ${term.title}. Definition: ${term.description}. Real world use case: ${term.useCase}`;
    const url = await generateGeminiSpeech(script);
    
    if (url) {
      setAudioUrl(url);
      setLoadingAudio(false);
      // Wait for state update to mount audio element
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    } else {
      setLoadingAudio(false);
      alert("Audio generation failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background */}
        <div className={`h-24 ${term.color} relative overflow-hidden shrink-0`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          <term.icon className="absolute right-4 top-4 text-white/20 w-24 h-24 rotate-12 transform translate-x-4 -translate-y-4" />
          
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 -mt-10 relative overflow-y-auto">
          <div className={`inline-flex p-3 rounded-xl shadow-lg ${term.color} mb-4`}>
            <term.icon className="w-6 h-6 text-white" />
          </div>

          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold text-slate-900">{term.title}</h2>
            
            {/* Audio Button */}
            <button 
              onClick={handlePlayAudio}
              className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-colors"
              disabled={loadingAudio}
            >
              {loadingAudio ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isPlaying ? (
                <StopCircle size={16} className="text-red-500" />
              ) : (
                <Play size={16} className="text-blue-500" />
              )}
              {loadingAudio ? "Generating..." : isPlaying ? "Stop" : "Listen"}
            </button>
            
            {/* Hidden Audio Element */}
            {audioUrl && (
              <audio 
                ref={audioRef} 
                src={audioUrl} 
                onEnded={() => setIsPlaying(false)} 
                className="hidden" 
              />
            )}
          </div>
          
          <p className="text-slate-500 font-medium text-lg mb-6">{term.shortDesc}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-2">
                <Box size={14} /> Description
              </h3>
              <p className="text-slate-700 leading-relaxed text-base">
                {term.description}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="text-sm uppercase tracking-wider text-teal-600 font-bold mb-2 flex items-center gap-2">
                <Zap size={14} /> Real World Use Case
              </h3>
              <p className="text-slate-600 italic text-base">
                "{term.useCase}"
              </p>
            </div>

            {/* GEMINI INSIGHTS SECTION */}
            <div className="pt-4 border-t border-slate-100">
               <h3 className="text-sm uppercase tracking-wider text-purple-600 font-bold mb-3 flex items-center gap-2">
                <Sparkles size={14} /> Ask Gemini AI
              </h3>
              
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={() => handleFetchInsight('eli5')}
                  className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-medium transition-all ${insightType === 'eli5' ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  👶 Explain Simple
                </button>
                <button 
                  onClick={() => handleFetchInsight('risks')}
                  className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-medium transition-all ${insightType === 'risks' ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  ⚠️ Future Risks
                </button>
                <button 
                  onClick={() => handleFetchInsight('startups')}
                  className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-medium transition-all ${insightType === 'startups' ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  🚀 Startup Ideas
                </button>
              </div>

              {/* Insight Output Area */}
              <div className="min-h-[80px] bg-purple-50/50 rounded-lg p-4 border border-purple-100 text-base text-slate-700">
                {loadingInsight ? (
                  <div className="flex items-center justify-center h-full text-purple-400 gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Consulting Neural Network...</span>
                  </div>
                ) : insight ? (
                  <div className="prose prose-sm animate-in fade-in">
                    {/* Simple formatting for bullet points if Gemini sends them */}
                    {insight.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 italic text-sm">
                    Select a button above to generate AI insights.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-bold uppercase tracking-wide border border-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ term, index, onClick }: { term: TermData; index: number; onClick: (term: TermData) => void }) => {
  return (
    <div 
      onClick={() => onClick(term)}
      className="group relative bg-white border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between h-full"
    >
      {/* Header Row: Badge Number + Title Pill */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full font-bold text-sm shrink-0 shadow-md">
          {index + 1}
        </div>
        
        {/* Updated Title Pill to Light Blue */}
        <div className="px-3 py-1.5 rounded-lg bg-sky-200 text-sky-900 font-bold text-sm truncate w-full text-center shadow-sm">
           {term.title}
        </div>
      </div>

      {/* Big Icon */}
      <div className="flex-grow flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
         <term.icon className="w-16 h-16 text-slate-800" strokeWidth={1.5} />
      </div>

      {/* Description */}
      <p className="text-center text-xs font-medium text-slate-600 leading-relaxed px-2">
        {term.shortDesc}
      </p>
    </div>
  );
};

export default function App() {
  const [selectedTerm, setSelectedTerm] = useState<TermData | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-300/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-300/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 py-10 flex flex-col h-screen">
        
        {/* Compact Header */}
        <header className="mb-8 flex flex-col md:flex-row items-end justify-between border-b border-slate-200 pb-8 shrink-0 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-blue-600 mb-3 uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              AI in Robotics Glossary
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Top AI Concepts in Robotics <span className="text-slate-400"></span>
            </h1>
          </div>
          
          <p className="hidden md:block text-base text-slate-500 max-w-md text-right leading-relaxed mb-1">
            Learn the essential AI components that power humanoids, cobots, drones, manipulators, and mobile robots.
          </p>
        </header>

        {/* Dense Grid - Responsive for "One Page" feel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-auto pb-6 custom-scrollbar flex-grow pr-2">
          {terms.map((term, index) => (
            <Card 
              key={term.id} 
              index={index}
              term={term} 
              onClick={setSelectedTerm} 
            />
          ))}
        </div>

      </div>

      {/* Modal Overlay */}
      {selectedTerm && (
        <Modal 
          term={selectedTerm} 
          onClose={() => setSelectedTerm(null)} 
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.5); /* slate-200 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.8); /* slate-400 */
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
