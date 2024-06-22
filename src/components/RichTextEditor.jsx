import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "./ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { AIChatSession } from "./../../service/AiModel";

const PROMPT =
  "Position Title : {positionTitle}. Based on this position, give me work summary bullet points to add in my resume. Give them in HTML Format.";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const GenerateSummaryWithAI = async () => {
    setLoading(true);

    if (!resumeInfo.experience[index].title) {
      toast("Please add Position Title");
      return;
    }

    const prompt = PROMPT.replace(
      '{positionTitle}', resumeInfo.experience[index].title
    
    );

    const result = await AIChatSession.sendMessage(prompt);
    const resp = result.response.text();

    setValue(resp.replace('[', '').replace(']', '').replace('","', ''));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <label className="text-xs">Work Summary</label>
        <Button
          className="flex gap-2 border-primary text-primary"
          variant="outline"
          size="sm"
          onClick={GenerateSummaryWithAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              Generate With AI <Brain className="h-4 w-4"/>
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnNumberedList />
            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
