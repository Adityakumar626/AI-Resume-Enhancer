"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file || !jd) return alert("Please upload a resume and paste a JD");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          AI Resume Tailor
        </h1>
        <p className="text-muted-foreground mt-2">
          Optimize your resume for any job description in seconds.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Upload Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job requirements here..."
              rows={4}
              onChange={(e) => setJd(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      <Button
        className="w-full h-12 text-lg"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing with AI..." : "Match & Tailor Resume"}
      </Button>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Match Score Card - Working fine based on your description */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Match Score
              </span>
              <div className="text-6xl font-black text-primary my-2">
                {result.matchPercentage ??
                  result.matchScore ??
                  result.score ??
                  0}
                %
              </div>
              <Progress
                value={
                  result.matchPercentage ??
                  result.matchScore ??
                  result.score ??
                  0
                }
                className="h-3"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Missing Skills - Defensive Check */}
            <Card>
              <CardHeader>
                <CardTitle>Missing Skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
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
                  ).map((skill: string) => (
                    <Badge key={skill} variant="destructive">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No missing skills identified.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* AI Feedback - Defensive Check */}
            <Card>
              <CardHeader>
                <CardTitle>AI Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.contentFeedback ??
                    result.feedback ??
                    result.summary ??
                    result.analysis ??
                    "No specific feedback provided."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
