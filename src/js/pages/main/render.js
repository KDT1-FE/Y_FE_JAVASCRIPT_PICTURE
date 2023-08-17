const $list = document.getElementById('member-list');

const render = (members, isSignin = false) => {
  members.forEach(member => {
    $list.innerHTML = `
          <li class="my-4 flex h-40 cursor-pointer flex-row gap-8 bg-slate-200 pl-4 hover:bg-blue-200">
            <input type="checkbox" />
            <img
              class="object-contain"
              src="${member.profileUrl}"
              alt="${member.person}의 프로필 사진" />
            <div class="md:flex-row flex grow flex-col items-center justify-around text-center text-lg">
              <div class="grow pt-1">${member.person}</div>
              <div class="md:hidden h-0.5 w-full bg-white"></div>
              <div class="grow pt-1">${member.email}</div>
              <div class="md:hidden h-0.5 w-full bg-white"></div>
              <div class="grow pt-1">${member.contact}</div>
              <div class="md:hidden h-0.5 w-full bg-white"></div>
              <div class="grow pt-1">${member.division}</div>
            </div>
          </li>`;
  });
};

export default render;
