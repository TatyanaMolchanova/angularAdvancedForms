export class User {
  constructor(
    public id: number,
    public name: string,
    public nickname: string,
    public country: string,
    public disabled = false
  ) {}
}
