export class Member {
  constructor(name, email, team, position, image) {
    this.name = name
    this.email = email
    this.team = team
    this.position = position
    this.image = image
  }
  toString() {
    return this.name + ', ' + this.email + ', ' + this.team + ', ' + this.position
  }
}

export const memberConverter = {
  toFirestore: (member) => {
    return {
      name: member.name,
      email: member.email,
      team: member.team,
      position: member.position,
      image: member.image,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Member(data.name, data.email, data.team, data.position, data.image)
  },
}
