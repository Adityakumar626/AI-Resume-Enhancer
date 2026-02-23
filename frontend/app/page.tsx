"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Upload,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Define the shape of your API result for better TS support
interface AnalysisResult {
  matchPercentage?: number;
  matchScore?: number;
  score?: number;
  missingSkills?: string[];
  missing_skills?: string[];
  skills?: string[];
  contentFeedback?: string;
  feedback?: string;
  summary?: string;
  analysis?: string;
}

// Unified Variants to fix the "duplicate prop" and TS issues
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleUpload = async () => {
    if (!file || !jd) return alert("Please upload a resume and paste a JD");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analyze`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 md:p-12 selection:bg-primary/20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Header Section */}
        <motion.header variants={fadeInUp} className="text-center space-y-4">
          <Badge
            variant="outline"
            className="px-3 py-1 text-primary border-primary/30 bg-primary/5"
          >
            AI-Powered Optimization
          </Badge>
          <h1 className="text-5xl font-black tracking-tight bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Resume Matchmaker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Upload your credentials and let our AI bridge the gap between your
            experience and the job requirements.
          </p>
        </motion.header>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Upload Resume - Entire Card is now clickable */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Added 'relative' and 'cursor-pointer' to the Card itself */}
            <Card className="relative h-full border-2 border-dashed transition-colors hover:border-primary/50 group bg-white dark:bg-slate-900 shadow-sm overflow-hidden cursor-pointer">
              {/* The invisible Input now covers the WHOLE card area */}
              <Input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText size={20} />
                </div>
                <CardTitle className="text-xl">Upload Resume</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="border-2 border-slate-100 dark:border-slate-800 rounded-xl p-8 text-center bg-slate-50/50 dark:bg-slate-950/50 transition-colors group-hover:bg-white dark:group-hover:bg-slate-900">
                  <Upload className="mx-auto mb-4 text-slate-400 group-hover:text-primary transition-all group-hover:scale-110" />
                  <p className="text-sm text-slate-500 font-medium mb-4">
                    {file
                      ? file.name
                      : "Tap anywhere in this box to upload PDF"}
                  </p>
                  {file && (
                    <Badge
                      variant="secondary"
                      className="mt-2 animate-in zoom-in"
                    >
                      Selected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Job Description - Remains standard for typing */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Card className="h-full border-2 border-transparent hover:border-primary/50 transition-all bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Sparkles size={20} />
                </div>
                <CardTitle className="text-xl">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job requirements here..."
                  className="min-h-40 resize-none border-none bg-slate-50/50 dark:bg-slate-950/50 focus-visible:ring-1 focus-visible:ring-primary/20"
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div variants={fadeInUp} className="flex justify-center">
          <Button
            size="lg"
            className="w-full cursor-pointer md:w-auto px-12 h-14 text-lg font-bold rounded-full shadow-lg hover:shadow-primary/25 transition-all hover:scale-[1.05] active:scale-[0.95]"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="mr-3"
                >
                  <Sparkles size={20} />
                </motion.div>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Analyzing with AI...
                </motion.span>
              </>
            ) : (
              "Match & Tailor Resume"
            )}
          </Button>
        </motion.div>

        {/* Result Section */}
        <div ref={resultsRef} className="scroll-mt-10">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 pt-10 border-t"
              >
                {/* Score Card */}
                <motion.div whileHover={{ scale: 1.01 }}>
                  <Card className="bg-primary/5 border-primary/20 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Sparkles size={160} />
                    </div>
                    <CardContent className="pt-10 pb-10 text-center">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
                        Match Score
                      </span>
                      <div className="text-8xl font-black text-primary my-4 tracking-tighter">
                        {result.matchPercentage ??
                          result.matchScore ??
                          result.score ??
                          0}
                        %
                      </div>
                      <div className="max-w-md mx-auto px-6">
                        <Progress
                          value={
                            result.matchPercentage ??
                            result.matchScore ??
                            result.score ??
                            0
                          }
                          className="h-3 bg-primary/10 shadow-inner"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Missing Skills */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="h-full"
                  >
                    <Card className="border-none shadow-xl bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow h-full flex flex-col">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                          <AlertCircle size={20} />
                          Missing Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex flex-wrap gap-2 max-h-62.5 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                          {(
                            result.missingSkills ??
                            result.missing_skills ??
                            result.skills ??
                            []
                          ).length > 0 ? (
                            (
                              result.missingSkills ??
                              result.missing_skills ??
                              result.skills ??
                              []
                            ).map((skill: string, idx: number) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + idx * 0.03 }}
                              >
                                <Badge
                                  variant="destructive"
                                  className="px-2.5 py-1 font-medium text-[12px] whitespace-normal"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground italic">
                              No gaps identified.
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* AI Feedback */}
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="h-full border-none shadow-xl bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 size={20} />
                          AI Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                          "
                          {result.contentFeedback ??
                            result.feedback ??
                            result.summary ??
                            result.analysis ??
                            "No specific feedback provided."}
                          "
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
