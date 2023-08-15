const member = (req, res) => {
  res.render('member/index');
};

const newMember = (req, res) => {
  res.render('member/newMember');
};

module.exports = {
  member,
  newMember,
};
