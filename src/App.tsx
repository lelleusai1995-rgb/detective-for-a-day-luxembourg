import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useContrastMode } from "./hooks/useContrastMode";
import StartScreen from "./components/StartScreen";
import BriefingScreen from "./components/BriefingScreen";
import HomeScreen from "./components/HomeScreen";
import EvidenceArchive from "./components/EvidenceArchive";
import EvidenceDetail from "./components/EvidenceDetail";
import ChapterList from "./components/ChapterList";
import ChapterDetail from "./components/ChapterDetail";
import TimelineView from "./components/TimelineView";
import SuspectList from "./components/SuspectList";
import FinalAnswerForm from "./components/FinalAnswerForm";
import FinalSolutionScreen from "./components/FinalSolutionScreen";

const DEFAULT_CASE_ID = "lux-gelle-fra";

export default function App() {
  // Initialise contrast mode once at the app root so the attribute is set
  // before any screen renders.
  useContrastMode();

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/game/${DEFAULT_CASE_ID}`} replace />}
      />
      <Route path="/game/:caseId" element={<StartScreen />} />
      <Route path="/game/:caseId/briefing" element={<BriefingScreen />} />
      <Route path="/game/:caseId/home" element={<HomeScreen />} />
      <Route path="/game/:caseId/archive" element={<EvidenceArchive />} />
      <Route
        path="/game/:caseId/evidence/:evidenceId"
        element={<EvidenceDetail />}
      />
      <Route path="/game/:caseId/chapters" element={<ChapterList />} />
      <Route
        path="/game/:caseId/chapter/:chapterId"
        element={<ChapterDetail />}
      />
      <Route path="/game/:caseId/timeline" element={<TimelineView />} />
      <Route path="/game/:caseId/suspects" element={<SuspectList />} />
      <Route path="/game/:caseId/final" element={<FinalAnswerForm />} />
      <Route path="/game/:caseId/solution" element={<FinalSolutionScreen />} />
      <Route
        path="*"
        element={<Navigate to={`/game/${DEFAULT_CASE_ID}`} replace />}
      />
    </Routes>
  );
}
