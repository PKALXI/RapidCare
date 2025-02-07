import { useDispatch } from 'react-redux';
import { setLoginState } from '../redux/appActions';
import { useNavigate } from 'react-router-dom';
import { genrateSignupStateData } from '../mockData/mockData';
//import { mapHealthcareProfessionalData } from '../helpers/helper';
//import { generateHealthcareProfessionalMockData } from '../mockData/mockData';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        // backend call here, currently using mock data
        
        //to test hp dashboard
        // const mockData = generateHealthcareProfessionalMockData();
        // if (mockData.isAuthenticated) {
        //     const mappedHealthcareProfessional = mapHealthcareProfessionalData(mockData.healthcareProfessional);
        //     dispatch(setLoginState(true, mockData.isUserAdmin, mockData.healthNetworkAdmin, mappedHealthcareProfessional));
        //     navigate('/home');
        // }

        //to test admin dashboard
        const mockData = genrateSignupStateData();
        if (mockData.isAuthenticated) {
            dispatch(setLoginState(true, true, mockData.healthNetworkAdmin, null));
            navigate("/home");
        }
    };

    return (
        // implement login view here.........
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleLogin} >Sign In</button>
        </div>
        
    );
};

export default Login;