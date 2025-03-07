 import React from 'react';

const Tools: React.FC = ({styles, updateStyles}) => {

    const [activeTab, setActiveTab] = React.useState('Tools');

    const tabs = ['Tools', 'Description'];


    return (
        <div className='w-full  bg-black text-white overflow-hidden border border-gray-700'>
            <div className='flex border-b border-gray-700'>
                    {tabs.map(tab => (
                <button
                    key={tab}
                    className={`px-4 py-2 flex items-center ${activeTab === tab ? 'bg-purple-900' : 'hover:bg-gray-800'}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab === 'Tools' && <span className="mr-2">●</span>}
                    {tab === 'Description' && <span className="mr-2">📝</span>}
                    {tab}
                </button>
                ))}
            </div>

            <div>
            {activeTab === 'Tools' && (
            <div className="space-y-4 ml-2">
          
            <div className="mb-4">
              <div className="font-semibold mb-1">Color:</div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-gray-300">Main Color</span>
                <input type="color" className="w-6 h-6 rounded"
                value={styles.mainColor}
                onChange={(e) => updateStyles("mainColor",e.target.value)}
                />
                
                <span className="text-gray-300 ml-2">Main Outline Color</span>
                <input type="color" className="w-6 h-6 rounded" defaultValue="#000000" />
                
                <span className="text-gray-300 ml-2">Second Color</span>
                <input type="color" className="w-6 h-6 rounded" defaultValue="#FF8800" />
                
                <span className="text-gray-300 ml-2">Second Outline Color</span>
                <input type="color" className="w-6 h-6 rounded" defaultValue="#000000" />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold mb-1">Size:</div>
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Font Size</span>
                  <input type="range" className="w-24" 
                  min="10"
                  max="30"
                  value={styles.fontSize}
                  onChange={(e) => updateStyles("fontSize",e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Spacing</span>
                  <input type="range" className="w-24" 
                  min="0"
                  max="5"
                  value={styles.spacing}
                  onChange={(e) => updateStyles("spacing",e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Vertical Margin</span>
                  <input type="range" className="w-24" 
                  min="10"
                  max="80"
                  value={styles.verticalMargin}
                  onChange={(e) => updateStyles("verticalMargin",e.target.value)}
                  />
                </div>
              </div>
            </div>
            
      
            <div className="mb-4">
              <div className="font-semibold mb-1">Shadow:</div>
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Background</span>
                  <button className="rounded-full w-5 h-5 bg-white flex items-center justify-center text-black font-bold text-xs">N</button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Opacity</span>
                  <input type="range" className="w-24" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Outline</span>
                  <input type="range" className="w-24" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Offset</span>
                  <input type="range" className="w-24" />
                </div>
              </div>
            </div>
         
            <div className="mb-4">
              <div className="font-semibold mb-1">Font:</div>
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <select className="bg-black border border-gray-700 rounded px-2 py-1">
                    <option>Source Han Sans CN</option>
                    <option>Arial</option>
                    <option>Helvetica</option>
                    <option>Times New Roman</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
        )}


        {activeTab === 'Description' && (
          <div className="p-2">
            <h3 className="text-lg font-bold mb-2">Description Here</h3>
          </div>
        )}
        
            </div>
        </div>
    );
};

export default Tools;