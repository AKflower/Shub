import styles from './permission.module.scss'

export default function Permission() {
    return (
        <>
            <table className="">
                <thead className="">
                    <tr className="">
                        <th className="">Name</th>
                        <th className="">P1</th>
                        <th className="">P2</th>
                        <th className="">P3</th>
                        <th className="">P4</th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="">
                        <td className="">admin</td>
                        <td className="">checkbox</td>
                        <td className="">checkbox</td>
                        <td className="">checkbox</td>
                        <td className="">checkbox</td>
                    </tr>
                    <tr className="">
                        <td className="">user</td>
                        <td className="">checkbox</td>
                        <td className="">checkbox</td>
                        <td className="">checkbox</td>
                        <td className="">checkbox</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}