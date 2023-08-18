const Member = require('../../models/Member');

const view = {
  index: (req, res) => {
    res.render('member/memberList');
  },
  newMember: async (req, res) => {
    res.render('member/registerMember');
  },
  editMember: async (req, res) => {
    res.render('member/editMember');
  },
};

const process = {
  getMembers: async (req, res) => {
    const member = new Member(req.query);
    const response = await member.getMembers();
    return res.json(response);
  },

  getMemberInfo: async (req, res) => {
    const member = new Member(req.params);
    const response = await member.getMemberInfo();
    return res.json(response);
  },

  registerMember: async (req, res) => {
    const member = new Member(req.body);
    const response = await member.registerMember();
    return res.json(response);
  },

  updateMember: async (req, res) => {
    const member = new Member(req.body);
    const response = await member.updateMember();
    return res.json(response);
  },

  editMember: async (req, res) => {
    const member = new Member(req.body);
    const response = await member.editMember();
    return res.json(response);
  },

  uploadS3andEditMember: async (req, res) => {
    req.body.profileImageURL = req.file.location;
    const member = new Member(req.body);
    const response = await member.uploadS3andEditMember();
    return res.json(response);
  },

  deleteMember: async (req, res) => {
    const member = new Member(req.body);
    console.log(req.body);
    const response = await member.deleteMember();
    return res.json(response);
  },

  deleteSingleMember: async (req, res) => {
    const member = new Member({ ids: [req.params.id] });
    const response = await member.deleteMember();
    return res.json(response);
  },

  uploadProfileImage: async (req, res) => {
    req.body.profileImageURL = req.file.location;
    const member = new Member(req.body);
    const response = await member.updateMember();
    return res.json(response);
  },

  deleteProfileImage: async (req, res) => {
    const member = new Member(req.body);
    const response = await member.updateMember();
    return res.json(response);
  },
};

module.exports = {
  view,
  process,
};
