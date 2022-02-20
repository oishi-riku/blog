import { useState } from 'react';

import { DRAFT_ARTICLE } from 'constants/';
import { Input } from 'validation/article';

const useDraftArticle = () => {
  const draft = localStorage.getItem(DRAFT_ARTICLE);

  const [draftArtcile, setDraftArticle] = useState<Input | null>(
    draft ? (JSON.parse(draft) as Input) : null
  );

  const updateDraft = (draft: Input) => {
    setDraftArticle(draft);
    localStorage.setItem(DRAFT_ARTICLE, JSON.stringify(draft));
  };

  const deleteDraft = () => {
    setDraftArticle(null);
    localStorage.removeItem(DRAFT_ARTICLE);
  };

  return { draftArtcile, updateDraft, deleteDraft };
};

export default useDraftArticle;
