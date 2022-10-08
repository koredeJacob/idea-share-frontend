import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded'
import CommentIcon from '@mui/icons-material/Comment'
import DeleteIcon from '@mui/icons-material/Delete'
import { AppContext } from '../App-provider'

const Postpreview = ({ postid, postcontent, updateLikes }) => {
	const likeset = new Set(postcontent.likes)
	const { user } = useContext(AppContext)

	return (
		<div className='w-full flex bg-gray-200 flex-col mb-4 border border-gray-600 drop-shadow-xl rounded-md space-y-1.5 justify-center items-center md:w-11s/12'>
			<div className='w-full flex rounded-t-md bg-gradient-to-r from-sky-400 to-blue-600 text-slate-100 px-4 pt-2 pb-1 border-b border-black items-center'>
				<div>
					<Link to={`/profile/${postcontent.userID}`}>
						<img
							src={`${postcontent.profilePicture}`}
							referrerPolicy='no-referrer'
							className='w-10 rounded-full'
							alt='profile picture'
						/>
					</Link>
				</div>
				<h5 className='ml-3 capitalize text-base font-medium'>{postcontent.profileName}</h5>
				<p className='ml-14 pl-2 md:ml-36 lg:ml-50 2xl:ml-64 text-xs font-medium'>{`${formatDistanceToNow(
					postcontent.postDate,
					{
						addSuffix: true
					}
				)}`}</p>
			</div>
			<Link to={`/post/${postcontent.postId}`}>
				<div className='w-full px-4 py-2 rounded-b-md bg-gray-200 text-gray-900/90 flex flex-col space-y-2 md:space-y-3'>
					<h3 className='leading-5 text-xl font-medium'>{postcontent.postTitle}</h3>
					<p className='line-clamp-3 text-start text-base leading-5 whitespace-pre-wrap'>
						{postcontent.postContent}
					</p>
				</div>
			</Link>
			<div className='w-full flex px-4 py-0.5 justify-start items-center space-x-6 border-t border-black'>
				<div className='flex space-x-1'>
					<ThumbUpAltRoundedIcon
						color={`${likeset.has(user) ? 'primary' : 'disabled'}`}
						onClick={() => updateLikes(postcontent.postId)}
					/>
					<p className='text-gray-600/75 text-base  font-medium'>{postcontent.likes.length}</p>
				</div>
				<div className='flex space-x-1'>
					<CommentIcon color='disabled' />
					<p className='text-gray-600/75 text-base  font-medium'>{postcontent.comments.length}</p>
				</div>
				<div className='w-[60%] pl-[47%] md:pl-[55%]'>
					{postcontent.userID === user && <DeleteIcon color='primary' />}
				</div>
			</div>
		</div>
	)
}

export default Postpreview
