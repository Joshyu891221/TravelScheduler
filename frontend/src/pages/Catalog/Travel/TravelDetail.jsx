import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Map1 from './component/Map/Map1.jsx'
import Map2 from './component/Map/Map2.jsx'
import Trace from './component/Trace/Trace.jsx'
import EditSpot from './component/Map/EditSpot.jsx'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import Typography from '@mui/material/Typography'
import { getTravelSpots, deletespot } from '../../../actions/spotAction.js'
import { makeStyles } from '@mui/styles'
import { set } from 'date-fns'

const useStyles = makeStyles({
	map: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 半透明黑色背景 */
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	mapContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 4,
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
		width: 1200,
		height: 500,
		maxHeight: '400px', /* 容器的最大高度 */
		overflowY: 'auto', /* 添加垂直滾動條 */
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		fontSize: 24,
		color: '#555',
		cursor: 'pointer'
	},
	closeButtonHover: {
		color: '#000'
	},
	trace: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 半透明黑色背景 */
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	traceContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 4,
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
		width: 1200,
		height: 500,
		maxHeight: '2000px', /* 容器的最大高度 */
		overflowY: 'auto', /* 添加垂直滾動條 */
	},
	travelContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 4,
		width: 800,
		height: 800,
		maxHeight: '2000px', /* 容器的最大高度 */
		overflowY: 'auto', /* 添加垂直滾動條 */
	},
	editSpot: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 半透明黑色背景 */
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	editSpotContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 4,
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
		width: 1200,
		height: 500,
		maxHeight: '1000px', /* 容器的最大高度 */
		overflowY: 'auto', /* 添加垂直滾動條 */
	}
});



const TravelDetail = ({ travelid }) => {
	const navigate = useNavigate();
	const dispatcher = useDispatch();
	const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
	const [showMap, setShowMap] = useState(false);
	const [showMap2, setShowMap2] = useState(false);
	const [showTrace, setShowTrace] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [steps, setSteps] = useState([]);
	const [passedIndex, setPassedIndex] = useState(0);
	const [passedArriveID, setPassedArriveID] = useState("");
	const [showEditSpot, setShowEditSpot] = useState(false);
	const [showDialog, setShowDialog] = useState(false); // State for dialog visibility
	const classes = useStyles();


	useEffect(() => {
		dispatcher(getTravelSpots(travelid));
		console.log("detail:", travelid);
	}, [travelid]);

	//call /api/spot/get2
	const spotFromBackend = useSelector(state => state.spotReducer.spots);
	console.log(spotFromBackend[0]);
	const spotLoaded = spotFromBackend[0]?.length > 0; // 检查 spotFromBackend 是否有数据
	const spotChange = spotFromBackend[0]?.length;


	// if(spotLoaded){
	// 	setSteps(spotFromBackend[0].map((spot) => ({label: spot.spot_name})));
	// }

	useEffect(() => {
		console.log(travelid);
		if (spotLoaded) {
			const newSteps = spotFromBackend[0].map((spot) => ({
				label: spot.spot_name,
			}));
			console.log(spotFromBackend[0]);
			//console.log(newSteps);
			setSteps(newSteps);
		}
		else{
			setSteps([]);
		}
	}, [spotLoaded, spotChange, travelid]);

	const deleteInfo = (index) => {
		dispatcher(deletespot(spotFromBackend[0][index].has_id, travelid));
		// setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
		setShowDialog(true);
	}

	// Function to open the dialog
	const openDialog = () => {
		setShowDialog(true);
	};

	// Function to close the dialog
	const closeDialog = () => {
		setShowDialog(false);
	};

	const callMap = () => {
		setShowMap(true);
	};
	const closeMap = () => {	
		//setSpotChange(spotFromBackend[0]?.length);
		setShowMap(false);
	};

	const callMap2 = (index) => {
		setShowMap2(true);
		setPassedArriveID(spotFromBackend[0][index].arrive_id)
	};
	const closeMap2 = () => {
		//setSpotChange(spotFromBackend[0]?.length);
		setShowMap2(false);
	};

	const getNewSpot = () => {
		if(spotLoaded){
			const newSteps = spotFromBackend[0].map((spot) => ({
				label: spot.spot_name,
			}));
			setSteps(newSteps);
		}
	}

	//進入查看路徑
	const callTrace = (index) => {
		setPassedIndex(index);
		setShowTrace(true);
	};
	const closeTrace = () => {
		setShowTrace(false);
	};

	//進入編輯地點頁面
	const callEditSpot = (index) => {
		setPassedIndex(index);
		setShowEditSpot(true);
	};
	const closeEditSpot = () => {
		setShowEditSpot(false);
	};

	//整個行程架構
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	const handleReset = () => {
		setActiveStep(0);
	};
	// console.log("detail:", travelid);
	return (
			<div className={classes.travelContent}>
				<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((step, index) => (
					<Step key={index}>
						<StepLabel>{step.label}</StepLabel>
						<StepContent>
							{activeStep !== steps.length - 1 && (
								<div>
									<Button onClick={() => callTrace(index)} variant="outlined" color="info" size="small" style={{ marginLeft: '10px', marginBottom: '10px' }}>查看路徑</Button>
								</div>
							)}
							{activeStep === steps.length - 1 && (
								<Button onClick={callMap} variant="outlined" color="secondary" size="small" style={{ marginLeft: '10px' }}>新增地點</Button>
							)}
							{activeStep !== steps.length - 1 && (
								<Button onClick={() => callMap2(index)} variant="outlined" color="secondary" size="small" style={{ marginLeft: '10px' }}>新增地點</Button>
							)}

							<Button onClick={() => callEditSpot(index)} variant="outlined" color="warning" size="small" style={{ marginLeft: '10px' }}>編輯地點</Button>
							<Button onClick={() => deleteInfo(index)} variant="outlined" color="error" size="small" style={{ marginLeft: '10px' }}>刪除地點</Button>
							<Box sx={{ mb: 2 }}>
								<div>
									<Button
										variant="contained"
										onClick={handleNext}
										sx={{ mt: 1, mr: 1 }}
									>
										{index === steps.length - 1 ? '完成' : '下一個地點'}
									</Button>
									<Button
										disabled={index === 0}
										onClick={handleBack}
										sx={{ mt: 1, mr: 1 }}
									>
										前一個地點
									</Button>
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && steps.length == 0 && (
				<Button onClick={callMap} variant="outlined" color="secondary" size="small" style={{ marginLeft: '10px' }}>新增地點</Button>
			)}
			{activeStep === steps.length && steps.length != 0 && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>恭喜你完成旅程</Typography>
					<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
						Reset
					</Button>
				</Paper>
			)}

			<br />
			{/* <Button variant="contained" color="success" size="large" style={{ marginRight: '10px' }}>確定</Button>
			<Button variant="contained" color="error" size="large">取消</Button> */}

			{showMap && (
				<div className={classes.map}>
					<span className={classes.closeButton} onClick={closeMap}>&times;</span>
					<div className={classes.mapContent}>
						<Map1 close={closeMap} renew={getNewSpot} travelid={travelid} />
					</div>
				</div>
			)}
			{showMap2 && (
				<div className={classes.map}>
					<span className={classes.closeButton} onClick={closeMap2}>&times;</span>
					<div className={classes.mapContent}>
						<Map2 close={closeMap2} renew={getNewSpot} arriveID={passedArriveID} travelid={travelid} />
					</div>
				</div>
			)}
			{showTrace && (
				<div className={classes.trace}>
					<span className={classes.closeButton} onClick={closeTrace}>&times;</span>
					<div className={classes.traceContent}>
						<Trace index={passedIndex} travelid={travelid}/>
					</div>
				</div>
			)}

			{showEditSpot && (
				<div className={classes.editSpot}>
					<span className={classes.closeButton} onClick={closeEditSpot}>&times;</span>
					<div className={classes.editSpotContent}>
						<EditSpot close={closeEditSpot} index={passedIndex} travelid={travelid}/>
					</div>
				</div>
			)}

			<Dialog open={showDialog} onClose={closeDialog}>
				<DialogTitle>刪除成功</DialogTitle>
				<DialogContent>
					<p>您已成功刪除該地點</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog}>完成</Button>
				</DialogActions>
			</Dialog>
			</div>

	);
}

export default TravelDetail