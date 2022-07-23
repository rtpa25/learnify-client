export function trimCourseName(courseName: string): string {
  if (courseName.length > 35) {
    return courseName.substring(0, 35) + '...';
  } else return courseName;
}
