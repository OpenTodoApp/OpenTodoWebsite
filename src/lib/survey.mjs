// The user survey strip (survey-strip): a plain link to the anonymous survey, nothing loaded
// from Tally. It is built until END (inclusive, UTC build date) and leaves the site by itself.
export const SURVEY = {
  url: 'https://tally.so/r/1W41xQ',
  end: '2026-12-11',
  /** The localStorage key a closed strip leaves behind. */
  key: 'ot-survey-closed',
};

/** True while a build on `date` (UTC) shows the strip. */
export const surveyActive = (date = new Date()) => date.toISOString().slice(0, 10) <= SURVEY.end;
