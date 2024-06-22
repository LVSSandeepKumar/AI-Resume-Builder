import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../service/AiModel";

const prompt = "Job Title: {jobTitle} , Depending on this job title give me a list of summary for 3 experience levels, Mid Level and Fresher level in 3-4 lines in array format, With summary and experience_level Field in JSON Format"

const SummaryForm = ({enableNext}) => {

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();

  useEffect(() => {
    summary && setResumeInfo({
      ...resumeInfo,
      summary : summary
    })
  }, [summary])

  const GenerateSummaryWithAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
    setAiGeneratedSummaryList(JSON.parse([result.response.text()]));
    setLoading(false);
  }

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    enableNext(true);

    const data = {
      data: {
        summary : summary
      }
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details Updated")
      },
      (error) => {
        setLoading(false);
      }
    );
  }

  return (
    <div>
      <div className="p-5 rounded-lg shadow-lg border-t-4 border-t-primary mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary/description for your desired job Title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end mt-7">
            <label>Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="border-primary text-primary flex gap-2"
              onClick={() => GenerateSummaryWithAI()}
            >
              Generate with AI
              <Brain className="h-4 w-4" />
            </Button>
          </div>

          <Textarea className="mt-5" 
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-2">{item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
