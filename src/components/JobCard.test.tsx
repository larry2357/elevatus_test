import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import JobCard from './JobCard';
import { Job } from '../services/jobs';

const job: Job = {
    "uuid": "968fedb4-39e2-43d8-98aa-032704d52b16",
    "title": "Accounting",
    "company_uuid": "900a776e-a060-422e-a5e3-979ef669f16b",
    "url": "https://salahat.elevatustesting.xyz/jobs/accounting-lac",
    "uri": "accounting-lac",
    "description": "<p>We are looking for someone to head our data science department.</p>",
    "requirements": "<ul>\n<li>Must be proficient in FastAPI</li>\n<li>Must know how build applications on top of Docker.</li>\n<li>Experience in OOP.</li>\n<li>Must have used GitOps.</li>\n</ul>",
    "translations": null,
    "salary": {
        "min": 300,
        "max": 400
    },
    "job_type": [],
    "degree": [
        "master"
    ],
    "skills": [
        "apache cassandra",
        "black box",
        "cloud gpus",
        "c",
        "bash",
        "pytorch",
        "kubernetes",
        "docker",
        "python",
        "manual test"
    ],
    "industry": [],
    "major": [
        "materials engineering and materials science",
        "sociology"
    ],
    "nationality": [
        "italian",
        "french"
    ],
    "career_level": [],
    "gender": null,
    "gpa": 80,
    "languages": [
        {
            "ar": 4
        },
        {
            "de": 1
        },
        {
            "fr": 5
        },
        {
            "en": 3
        }
    ],
    "location": {
        "country": "",
        "city": "Paris"
    },
    "geolocation": {
        "latitude": 31,
        "longitude": 35
    },
    "years_of_experience": [
        2
    ],
    "willing_to_travel": false,
    "willing_to_relocate": false,
    "visa_sponsorship": true,
    "score": 0,
    "is_applied": false,
    "applied_at": null,
    "is_top": true,
    "posted_at": "2022-04-26 09:09:41",
    "outside": false,
    "has_profile": false,
    "outside_key": null
};

test('JobCard renders with data', async () => {
    const handleClick = jest.fn()
    render(<JobCard job={job} handleViewClick={handleClick} />);
    expect(screen.getByText('Accounting')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('apache cassandra,black box,cloud gpus,c,bash,pytorch,kubernetes,docker,python,manual test')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("view-button"));
    expect(handleClick).toHaveBeenCalledTimes(1)
});

test('simple JobCard renders with data', async () => {
    const handleClick = jest.fn()
    render(<JobCard job={job} handleViewClick={handleClick} type="simple" />);
    expect(screen.getByText('Accounting')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('apache cassandra,black box,cloud gpus,c,bash,pytorch,kubernetes,docker,python,manual test')).toBeInTheDocument();
    expect(screen.queryByTestId("view-button")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("simple-jobcard"));
    expect(handleClick).toHaveBeenCalledTimes(1)
});