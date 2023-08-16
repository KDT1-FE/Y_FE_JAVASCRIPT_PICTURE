import {db , storage} from './firebase.js'


const getFormData = (event)=>{
    const formData = new FormData(event.target);
    const file = formData.get("img");
    const name = formData.get("name");
    const email = formData.get('email');
    const position = formData.get('position');
    const phoneNum = formData.get('phoneNum');
    return {name,email,position,phoneNum,file}
}



const getLastEmployeeId = async () => {
    const profileRef = await db.collection('profileData').doc('profileData').get()
    const data = profileRef.data();
    return data
}


const addEmployeeId = async () => {
    const profileRef = db.collection('profileData').doc('profileData');
    
    try {
        const lastEmployeeData = await getLastEmployeeId();
        const LastEmployeeId = lastEmployeeData.totalEmployees;
        const newEmployeeId = LastEmployeeId + 1;
        
        await profileRef.update({ totalEmployees: newEmployeeId });
        
        return newEmployeeId;
    } catch (error) {
        console.error('Error updating employee ID: ', error);
        return null;
    }
};

const addFirestore = (collection,doc,set) => {
    db.collection(collection).doc(doc).set(set);
};

export const addFirestorage = (file,employeesId)=>{
    let storageRef = storage.ref();
    let storageUrl = storageRef.child('image/'+employeesId+'.jpg');
    let upload = storageUrl.put(file);

};

export const delFireStorage = async (employeesId)=>{
    let storageRef = storage.ref();
    let storageUrl = storageRef.child('image/'+employeesId+'.jpg');
    await storage.delete()
}

// 직원 생성
document.querySelector('#myForm').addEventListener("submit",async (e)=>{
    e.preventDefault();
    const {file,name,email,position,phoneNum} = getFormData(e);
    const newEmployeeId = await addEmployeeId();
    console.log(typeof(newEmployeeId))
    addFirestore('profile',newEmployeeId.toString(),{employeeId:newEmployeeId,name,email,phonenum:phoneNum,position})
    addFirestorage(file,newEmployeeId);
    console.log('생성하였습니다');
    setTimeout(()=>window.location.href = "/index.html",500)
});

document.querySelector('.btn__cancel').addEventListener('click',()=>{
    window.location.href = '/index.html'
})


async function renderTotalEmployees () {
    let totalEmployees = 0;
    const test = await db.collection('profile').get();
    test.forEach(()=>{
        totalEmployees++;
    })
    document.querySelector('.search__total').innerHTML += totalEmployees    
}

renderTotalEmployees()
