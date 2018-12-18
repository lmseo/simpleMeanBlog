import { FormGroup } from "@angular/forms";

interface Post {
  title: string;
  content: string;
}

export class MatchValidator {
  constructor(private post: Post) {}
  public match(group: FormGroup) {
    let valid = false;

    for (const name in group.controls) {
      if (group.controls[name].value !== this.post[name]) {
        valid = true;
      }
    }

    if (valid) {
      return null;
    }

    return {
      match: true
    };
  }
}
