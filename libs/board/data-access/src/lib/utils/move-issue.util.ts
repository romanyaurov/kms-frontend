import { Issue } from '@kms-frontend/core/api-types';

export function positiveIssueMoving(
  allIssues: Issue[],
  issueId: string,
  columnSlug: string,
  order: number
): Issue[] {
  const targetIssue = allIssues.find((issue) => issue.id === issueId);

  const targetIssueNewStatement = {
    ...targetIssue!,
    column: columnSlug,
    order: order,
  };

  const notChangedIssues = allIssues.filter(
    (issue) =>
      issue.column !== targetIssue?.column && issue.column !== columnSlug
  );

  let updatedPreviousColumnIssues: Issue[] = [];
  if (targetIssue?.column !== columnSlug) {
    const previousColumnIssues = allIssues
      .filter(
        (issue) =>
          issue.column === targetIssue?.column && issue.id !== targetIssue?.id
      )
      .sort((a, b) => a.order - b.order);

    updatedPreviousColumnIssues = previousColumnIssues.map((issue, index) => ({
      ...issue,
      order: index + 1,
    }));
  }

  const currentColumnIssues = allIssues
    .filter(
      (issue) => issue.column === columnSlug && issue.id !== targetIssue?.id
    )
    .sort((a, b) => a.order - b.order);

  currentColumnIssues.splice(order - 1, 0, targetIssueNewStatement);

  const updatedCurrentColumnIssues = currentColumnIssues.map(
    (issue, index) => ({
      ...issue,
      order: index + 1,
    })
  );

  return [
    ...notChangedIssues,
    ...updatedPreviousColumnIssues,
    ...updatedCurrentColumnIssues,
  ];
}
