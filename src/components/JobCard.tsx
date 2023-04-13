import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Job } from '../services/jobs';

interface JobCardProps {
    job: Job;
    handleViewClick: (job: Job) => void;
    type?: "large" | "simple";
};

const JobCard: FC<JobCardProps> = ({ job, handleViewClick, type = "large" }: JobCardProps) => {
    const beautifyLocation = () => {
        const { city, country } = job.location;
        if (city && country) {
            return `${city}, ${country}`;
        }
        return `${city}${country}`;
    }
    if (type === "simple") {
        return (
            <Card data-testid="simple-jobcard" sx={{ mb: 2, cursor: "pointer" }} onClick={() => handleViewClick(job)}>
                <CardContent>
                    <Typography variant="subtitle1">
                        {job.title}
                    </Typography>
                    {beautifyLocation() && (
                        <>
                            <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                                {beautifyLocation()}
                            </Typography>
                            <Divider />
                        </>
                    )}
                    <Typography variant="body2">
                        {job.skills.join(',')}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardContent sx={{ height: 150 }}>
                <Typography variant="subtitle1">
                    {job.title}
                </Typography>
                {beautifyLocation() && (
                    <>
                        <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                            {beautifyLocation()}
                        </Typography>
                        <Divider />
                    </>
                )}
                {job.career_level.length > 0 && (
                    <>
                        <Typography variant="body2">
                            {job.career_level.join(',')}
                        </Typography>
                        <Divider />
                    </>
                )}
                <Typography variant="body2">
                    {job.skills.join(',')}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="outlined" size="small" onClick={() => handleViewClick(job)} data-testid="view-button">View</Button>
            </CardActions>
        </Card>
    );
}

export default React.memo(JobCard);