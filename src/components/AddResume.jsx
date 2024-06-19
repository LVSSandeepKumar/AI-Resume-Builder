import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);

    const navigate = useNavigate();

    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then(resp => {
        if(resp) {
            if(resp) {
                setLoading(false);
                navigate('/dashboard/resume/'+resp.data.data.documentId+'/edit')
            }
        }
    }, (error) => {
        setLoading(false)
    })
  };

  return (
    <div>
      <div
        className="flex item-center justify-center p-14 py-24 border bg-secondary rounded-lg
        h-[280px] hover:scale-105 transition-all hover:shadow-md"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a Title for your Resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack Developer Resume"
                onChange={(e) => {
                  setResumeTitle(e.target.value);
                }}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onCreate();
                }}
                disabled={
                  !resumeTitle || loading
                }
              >
                {
                    loading ? <Loader2 className="animate-spin" />
                    : "Create"
                }
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
